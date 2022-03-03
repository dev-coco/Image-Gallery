function onOpen () {
  const ui = SpreadsheetApp.getUi()
  ui.createMenu('扩展功能')
    .addItem('获取文件', 'listFilesInFolder')
    .addItem('删除内容', 'clearColumn')
    .addItem('生成代码', 'sidebar')
    .addToUi()
}

function listFilesInFolder () {
  let file, name, id
  const data = []
  const sheet = SpreadsheetApp.getActiveSheet()
  // 获取 A1 单元格的文件夹 ID
  const folderId = sheet.getRange('A1').getValue()
  const folder = DriveApp.getFolderById(folderId)
  const contents = folder.getFiles()
  while(contents.hasNext()) {
    file = contents.next()
    name = file.getName()
    id = file.getId()
    data.push([name, id])
  }
  sheet.getRange(2, 1, data.length, 2).setValues(data)
}

function clearColumn () {
  const sheet = SpreadsheetApp.getActiveSheet()
  sheet.getRange('A2:B').clearContent()
}

function sidebar () {
  const html = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('生成器')
  SpreadsheetApp.getUi().showSidebar(html)
}
