package com.dxc.forum.helper;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.dxc.forum.entity.UploadSession;

public class SessionExcelHelper {

	//check that file is of excel type or not
		public static boolean checkExcelFormat(MultipartFile file)throws NullPointerException {
			String contentType = file.getContentType();
			if(contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
				return true;
			}else {
				return false;
			}
		}
		
		//Convert excel to list
		public static List<UploadSession> convertExcelToList(InputStream is){
			List<UploadSession> list = new ArrayList<>();
			try {
				XSSFWorkbook workbook = new XSSFWorkbook(is);
				XSSFSheet sheet = workbook.getSheet("Sheet2");
				int rowNumber = 0;
				Iterator<Row> iterator = sheet.iterator();
				while(iterator.hasNext()) {
					Row row = iterator.next();
					if(rowNumber == 0) {
						rowNumber++;
						continue;
					}
					Iterator<Cell> cells = row.iterator();
					int cid = 0;
					UploadSession uploadSession = new UploadSession();
					while(cells.hasNext()) {
						Cell cell = cells.next();
						switch(cid) {
							case 0: 
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setBatch(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setBatch(String.valueOf((int)(cell.getNumericCellValue())));
								break;
							case 1: 
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setTopicName(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setTopicName(String.valueOf(cell.getNumericCellValue()));
								break;
							case 2:
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setTrainerName(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setTrainerName(String.valueOf(cell.getNumericCellValue()));
								
								break;
							case 3:
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setBatchSize(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setBatchSize(String.valueOf(cell.getNumericCellValue()));
								break;
							case 4:
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setSessionDate(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setSessionDate(String.valueOf(cell.getNumericCellValue()));
								break;
							case 5:
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setSessionTime(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setSessionTime(String.valueOf(cell.getNumericCellValue()));
								break;
							case 6:
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setSessionLink(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setSessionLink(String.valueOf(cell.getNumericCellValue()));
								break;
							case 7: 
								if(cell.getCellType()==CellType.STRING) 
									uploadSession.setSessionVideo(cell.getStringCellValue());
								else if(cell.getCellType()==CellType.NUMERIC) 
									uploadSession.setSessionVideo(String.valueOf(cell.getNumericCellValue()));
								
								break;
							default:
								break;
						}
						cid++;
					}
					list.add(uploadSession);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
			
			return list;
		}
}
