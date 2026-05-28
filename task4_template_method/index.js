class ReportGenerator {
    generate(source) {
        const rawData = this.load(source);
        const records = this.parse(rawData);
        const summary = this.analyze(records);
        return this.format(summary);
    }

    load(source) {
        return source;
    }

    parse(_rawData) {
        throw new Error('parse must be implemented by subclass');
    }

    analyze(records) {
        const totalAmount = records.reduce(function(sum, record) {
            return sum + record.amount;
        }, 0);

        return {
            count: records.length,
            totalAmount: totalAmount,
            averageAmount: records.length === 0 ? 0 : totalAmount / records.length
        };
    }

    format(summary) {
        return [
            'Records: ' + summary.count,
            'Total: ' + summary.totalAmount,
            'Average: ' + summary.averageAmount.toFixed(2)
        ].join('\n');
    }
}

class CsvReportGenerator extends ReportGenerator {
    parse(rawData) {
        const lines = rawData.trim().split(/\r?\n/);

        return lines.slice(1).map(function(line) {
            const parts = line.split(',');
            return {
                name: parts[0],
                amount: Number(parts[1])
            };
        });
    }
}

class JsonReportGenerator extends ReportGenerator {
    parse(rawData) {
        return JSON.parse(rawData);
    }
}

function runTemplateMethodDemo() {
    const csv = 'name,amount\nAdapter,12\nCommand,18\nVisitor,9';
    const json = JSON.stringify([
        { name: 'State', amount: 14 },
        { name: 'Iterator', amount: 16 },
        { name: 'Template Method', amount: 20 }
    ]);

    const csvReport = new CsvReportGenerator();
    const jsonReport = new JsonReportGenerator();

    console.log('CSV report:');
    console.log(csvReport.generate(csv));

    console.log('\nJSON report:');
    console.log(jsonReport.generate(json));
}

module.exports = {
    ReportGenerator,
    CsvReportGenerator,
    JsonReportGenerator,
    runTemplateMethodDemo,
    run: runTemplateMethodDemo
};

if (require.main === module) {
    runTemplateMethodDemo();
}
