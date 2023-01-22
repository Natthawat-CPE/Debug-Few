package entity

import (
	"time"

	"gorm.io/gorm"
)

type Gender struct{
	gorm.Model
	GenderName	string
	Customer	[]Customer	`gorm:"foreignKey:GENDER_ID"`
}

type Career struct{
	gorm.Model
	CareerName	string
	Customer	[]Customer	`gorm:"foreignKey:CAREER_ID"`
}

type Prefix	struct{
	gorm.Model
	PrefixName	string
	Customer	[]Customer	`gorm:"foreignKey:PREFIX_ID"`
}

type Customer struct {
	gorm.Model
	Name        string
	ID_card		string
	DOB			time.Time		
	Phone		*uint

	GENDER_ID	*uint
	GENER		Gender	`gorm:"references:id"`

	CAREER_ID	*uint
	CAREER		Career	`gorm:"references:id"`

	PREFIX_ID	*uint
	PREFIX		Prefix	`gorm:"references:id"`

	Email		string `gorm:"uniqueIndex"`
	Password	string	`json:"-"`

	Address []Address `gorm:"ForeignKey:CustomerID"`
	Device []Device `gorm:"ForeignKey:CustomerID"`
	ORDER []ORDER `gorm:"foreignKey:CustomerID"`
}