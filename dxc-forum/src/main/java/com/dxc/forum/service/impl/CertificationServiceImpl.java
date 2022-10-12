package com.dxc.forum.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dxc.forum.custom_exception.BusinessException;
import com.dxc.forum.entity.Certification;
import com.dxc.forum.helper.CertificationExcelHelper;
import com.dxc.forum.repository.CertificationRepo;
import com.dxc.forum.service.CertificationService;
import com.dxc.forum.utils.ErrorMessageConstants;

@Service
public class CertificationServiceImpl implements CertificationService {

	@Autowired
	private CertificationRepo certificationRepository;

	public CertificationServiceImpl() {
		super();
	}

	public CertificationServiceImpl(CertificationRepo certificationRepository) {
		super();
		this.certificationRepository = certificationRepository;
	}

	@Override
	public Certification addCertificationEntity(Certification certificationEntity) {
		if (certificationEntity.getName().isEmpty() || certificationEntity.getName().length() == 0) {
			throw new BusinessException("1203", ErrorMessageConstants.PROPER_CERTIFICATE_NAME);
		}else if(certificationEntity.getStatus().isEmpty()|| certificationEntity.getStatus().length()==0){
			throw new BusinessException("1220 ",  ErrorMessageConstants.PROPER_CERTIFICATE_STATUS);
		}
		else if(certificationEntity.getDate().isEmpty()|| certificationEntity.getDate().length()==0){
			throw new BusinessException("1230 ", ErrorMessageConstants.PROPER_CERTIFICATE_DATE);
		}
		try {
			 
				return certificationRepository.save(certificationEntity);
		}

		catch (IllegalArgumentException e) {
			throw new BusinessException("1102", ErrorMessageConstants.CERTIFICATE_ID_NULL + e.getMessage());
		}

		catch (Exception e) {
			throw new BusinessException("1103", ErrorMessageConstants.ERROR_MESSAGE_SERVICE + e.getMessage());
		}

	}

	@Override
	public List<Certification> getCertificationEntities() {
		try {
			List<Certification> CertificationList = certificationRepository.findAll();
			if (CertificationList.isEmpty()) {
				throw new BusinessException("1104", ErrorMessageConstants.EMPTY_LIST);
			}
			return CertificationList;
		}

		catch (Exception e) {
			throw new BusinessException("1105",
					ErrorMessageConstants.ERROR_MESSAGE_SERVICE + e.getMessage());

		}

	}

	@Override
	public Certification updateCerticationEntity(Certification certificationEntity, long id) {
		
		if(certificationEntity.getName().isEmpty() || certificationEntity.getName().length() == 0) {
			throw new BusinessException("1205 ", ErrorMessageConstants.PROPER_CERTIFICATE_NAME);
		}
		else if(certificationEntity.getStatus().isEmpty()|| certificationEntity.getStatus().length()==0){
			throw new BusinessException("1206 ", ErrorMessageConstants.PROPER_CERTIFICATE_STATUS);
		}
		
		else if(certificationEntity.getDate().isEmpty()|| certificationEntity.getDate().length()==0){
			throw new BusinessException("1207 ", ErrorMessageConstants.PROPER_CERTIFICATE_DATE);
		}
		
     try {
    	 Certification updateCertificationEntity = certificationRepository.findById(id).get();
 		updateCertificationEntity.setName(certificationEntity.getName());
 		updateCertificationEntity.setStatus(certificationEntity.getStatus());
 		updateCertificationEntity.setDate(certificationEntity.getDate());
	    return certificationRepository.save(updateCertificationEntity);
	    
      }	
		catch (IllegalArgumentException e) {
			throw new BusinessException("1201", ErrorMessageConstants.CERTIFICATE_ID_NULL);
		}

		catch (Exception e) {
			throw new BusinessException("1202", ErrorMessageConstants.ERROR_MESSAGE_SERVICE + e.getMessage());
		}

	}

	@Override
	public Certification getCertificationEntityById(long id) {

		try {

		 return certificationRepository.findById(id).get();
			
		} catch (IllegalArgumentException e) {
			throw new BusinessException("1106", ErrorMessageConstants.CERTIFICATE_ID_NULL + e.getMessage());
		} catch (java.util.NoSuchElementException e) {
			throw new BusinessException("1107", ErrorMessageConstants.ID_NOT_IN_DB + e.getMessage());
		}

	}

	@Override
	public ResponseEntity<Certification> deleteCertificationEntityById(long id) {
		
			this.certificationRepository.deleteById(id);
			return new ResponseEntity<Certification>(HttpStatus.NO_CONTENT);
		} 

	

	@Override
	public void uploadExcel(MultipartFile file) {
		try {
			List<Certification> certificate = CertificationExcelHelper.convertExcelToList(file.getInputStream());
			this.certificationRepository.saveAll(certificate);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public Long totalCertificate() {
		try {
			Long totalCertificate = this.certificationRepository.count();
			if (totalCertificate == 0) {
				throw new BusinessException("1109", ErrorMessageConstants.CERTIFICATE_COUNT_NULL);
			}
			return totalCertificate;
		}
		
		catch (IllegalArgumentException e) 
		{
			throw new BusinessException("1110",  ErrorMessageConstants.CERTIFICATE_ID_NULL + e.getMessage());
		}

		catch (Exception e) {
			e.printStackTrace();

		}
		return null;

	}

}
