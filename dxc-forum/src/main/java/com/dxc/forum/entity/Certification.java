package com.dxc.forum.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "certificates", schema = "dxc_forum")
public class Certification {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "emp_id")
	private int empId;
	@Column(name = "Certifition_Name", nullable = false)
	private String name;
	@Column(name = "Status", nullable = false)
	private String status;
	@Column(name = "Submission_Date", nullable = false)
	private String date;

	public Certification() {
		super();
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public Certification(Long id, int empId, String name, String status, String date) {
		super();
		this.id = id;
		this.empId = empId;
		this.name = name;
		this.status = status;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

}
