/**
 *
 * @param {Array} tables sheet数据 [arr[arr[obj]]]
 * @param {Array} keys 要写入xls的数据key值 [arr[arr[str]]]
 * @param {Array} SheetName sheet的名字 arr[str]
 * @param {String} fileName xls文件的名字 str
 */
export default function(tables, keys, SheetName, fileName) {
    const uri = 'data:application/vnd.ms-excel;base64,'
        , tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
        + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>MasterDAX</Author><Created>{created}</Created></DocumentProperties>'
        + '<Styles>'
        + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
        + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
        + '</Styles>'
        + '{worksheets}</Workbook>'
        , tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>'
        , tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

        let ctx = "";
        let workbookXML = "";
        let worksheetsXML = "";
        let rowsXML = "";

        const type = {
            string: "String",
            number: "Number",
            boolean: "Boolean"
        }
        //控制导出的sheet
        for (var i = 0; i < tables.length; i++) {
            const table = tables[i]
            const key = keys[i]
            //控制要导出的行数
            for (var j = 0; j < table.length; j++) {
                rowsXML += '<Row>';
                //控制导出的列数
                for (var k = 0; k < key.length; k++) {
                    var dataValue = table[j][key[k]];
                    var dataType = type[typeof(dataValue)] ? type[typeof(dataValue)] : "String";

                    const ctx = {
                        attributeStyleID: '',
                        nameType: dataType,
                        data: dataValue,
                        attributeFormula: ''
                    };
                    rowsXML += format(tmplCellXML, ctx);
                }
                rowsXML += '</Row>'
            }
            ctx = {rows: rowsXML, nameWS: SheetName[i] || 'Sheet' + i};
            worksheetsXML += format(tmplWorksheetXML, ctx);
            rowsXML = "";
        }

        ctx = {created: (new Date()).getTime(), worksheets: worksheetsXML};
        workbookXML = format(tmplWorkbookXML, ctx);

        let link = document.createElement("A");
            link.href = uri + base64(workbookXML);
            link.download = fileName ? fileName+'.xls' : 'Workbook.xls';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
}
