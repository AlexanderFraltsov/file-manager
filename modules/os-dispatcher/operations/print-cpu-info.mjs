import { EOL, cpus } from 'node:os';

export const printCpuInfo = () => {
	const info = cpus()
	.map(({ model, speed }) => ({
		Model: model,
		'Frequency, GHz': speed / 1000,
	}));

	console.log(
		`${EOL}Host machine CPUs info:${
			EOL
		}Amount of cores - ${info.length};${
			EOL
		}Model - ${info[0].Model};${
			EOL
		}Details:`
	);
	console.table(info);
}
