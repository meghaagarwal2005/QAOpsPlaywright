import { test, expect } from '@playwright/test';
const ExcelJs = require('exceljs');
const workbook = new ExcelJs.Workbook();

async function writeExcelFile(searchText,replaceText,change,filePath){
   
await workbook.xlsx.readFile(filePath);
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(worksheet, searchText);
const cell = worksheet.getCell(output.row+change.rowChange, output.column+change.columnChange);
cell.value = replaceText;
workbook.xlsx.writeFile(filePath).then(() => {
  console.log('Excel file updated successfully!');
})
.catch((error) => {
  console.error('Error updating Excel file:', error);       
}
);}

async function readExcel(worksheet, searchText) {
     let output = {row:-1, column:-1};
    worksheet.eachRow((row, rowNumber) => {
  row.eachCell((cell, colNumber) => {
    if(cell.value===searchText){ {
        output.row=rowNumber;
        output.column=colNumber;
      console.log(`Row ${rowNumber}, Column ${colNumber}: ${cell.value}`);
    }}
  });
});
return output;
}


//writeExcelFile("Mango","350",{rowChange:0, columnChange:2},"C:\\Users\\megha\\Download.xlsx");


test("Upload Download excel validation", async ({ page }) => {
  const textSearch="Mango";
  const updateText="350";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    const [download] = await Promise.all([
  page.waitForEvent('download'),
  page.getByRole('button', { name: 'Download' }).click()
]);

console.log(await download.path());

    const filePath = 'C:\\Users\\megha\\Downloads\\download.xlsx';
    await writeExcelFile(textSearch,updateText,{rowChange:0, columnChange:2},filePath);
   await page.locator('#fileinput').setInputFiles(filePath);
   const textLocator = page.getByText(textSearch);
   const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    
   await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateText);
});

