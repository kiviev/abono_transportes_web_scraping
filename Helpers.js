


module.exports = {
	getAbonoNum(num) {
		let split = num.split(' ');
		let obj = {
			select: null,
			input: null
		};
		if (split.length && split.length == 2) {
			obj.select = split[0];
			obj.input = split[1]
		}
		return obj;

	},
	getAbonoResultData(data) {

		let finalData = {};
		let carga = data[2].split(':');
		let validez = data[3].split(':');
		let primerUso = data[4].split(':');
		let caducidad = data[5].split(':');
		finalData['Zona'] = data[0].trim();
		finalData['Tipo de Abono'] = data[1].trim();
		finalData['Fecha de Carga'] = carga[1].trim();
		finalData['Fecha de inicio de Validez'] = validez[1].trim();
		finalData['Fecha de Primer Uso'] = primerUso[1].trim();
		finalData['Fecha de Caducidad'] = caducidad[1].trim();
		return finalData;
	},
	getAbonoResultToNotificate(data){
		var str = '';
		for (var p in data) {
			if (data.hasOwnProperty(p)) {
				str += '- ' + p + ' -> ' + data[p] + '\n';
			}
		}
		return str;
	}

}