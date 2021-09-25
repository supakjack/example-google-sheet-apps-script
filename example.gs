spreadsheet = SpreadsheetApp.openById('Id Sheet');
sheet = spreadsheet.getSheetByName('Name Paper');
lastRow = sheet.getLastRow()

function output(response) {
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
}

function doGet() {
  const response = {
    data: []
  }
  if (lastRow > 1) {
    response.data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues()
  }
  return output(response)
}

function doPost(e) {
  const action = e.parameter.action
  if (action == 'addData') {
    return addData(e)
  } else if (action == 'deleteData') {
    return deleteData()
  } else if (action == 'countData') {
    return countData()
  }
}

function addData(e) {
  const data = JSON.parse(e.postData.contents)
  sheet.appendRow([data.P1,data.P2,data.P3,data.P4,data.P5])
  const response = {
    data: [data.P1,data.P2,data.P3,data.P4,data.P5]
  }
  return output(response)
}

function deleteData() {
  for (var i = lastRow; i > 1; i--) {
    sheet.deleteRow(i);
  }
  const response = {
    data: "success delete"
  }
  return output(response)
}

function countData() {
  const response = {
    data: {
      rows: lastRow - 1
    }
  }
  return output(response)
}