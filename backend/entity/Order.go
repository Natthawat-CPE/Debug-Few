package entity

import (
	"time"

	"gorm.io/gorm"
)

type CASE struct {
	gorm.Model
	Case_text  string
	Level_case *uint
	ORDER      []ORDER `gorm:"foreignKey:CASEID"`
}

type ORDER struct {
	gorm.Model

	Date_time time.Time
	Reason    string
	Limit     int

	CASEID *uint
	CASE   CASE `gorm:"references:id"`

	DeviceID *uint
	Device   Device `gorm:"references:id"`

	AddressID *uint
	Address   Address `gorm:"references:id"`

	CustomerID *uint
	Customer   Customer `gorm:"references:id"`

	Refund []Refund `gorm:"ForeignKey:OrderID"`

	OrderTech []OrderTech `gorm:"ForeignKey:OrderID"`
}
