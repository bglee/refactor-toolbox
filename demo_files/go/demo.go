package main

import (
	"fmt"
	"time"
)

// Person represents a person with basic information
type Person struct {
	Name     string
	Age      int
	Birthday time.Time
}

// NewPerson creates a new Person instance
func NewPerson(name string, age int, birthday time.Time) *Person {
	return &Person{
		Name:     name,
		Age:      age,
		Birthday: birthday,
	}
}

// String implements the Stringer interface
func (p *Person) String() string {
	return fmt.Sprintf("%s is %d years old", p.Name, p.Age)
}

// CalculateAge calculates the age based on birthday
func (p *Person) CalculateAge() int {
	now := time.Now()
	years := now.Year() - p.Birthday.Year()
	if now.Month() < p.Birthday.Month() || (now.Month() == p.Birthday.Month() && now.Day() < p.Birthday.Day()) {
		years--
	}
	return years
}

// Interface for any type that can be greeted
type Greeter interface {
	Greet() string
}

// Implement Greeter interface for Person
func (p *Person) Greet() string {
	return fmt.Sprintf("Hello, my name is %s", p.Name)
}

func main() {
	// Create a new person
	birthday := time.Date(1990, time.January, 1, 0, 0, 0, 0, time.UTC)
	person := NewPerson("John Doe", 30, birthday)

	// Use the person's methods
	fmt.Println(person.String())
	fmt.Println(person.Greet())
	fmt.Printf("Calculated age: %d\n", person.CalculateAge())

	// Demonstrate interface usage
	var greeter Greeter = person
	fmt.Println(greeter.Greet())

	// Demonstrate error handling
	if err := processPerson(person); err != nil {
		fmt.Printf("Error processing person: %v\n", err)
	}
}

// processPerson demonstrates error handling in Go
func processPerson(p *Person) error {
	if p == nil {
		return fmt.Errorf("person cannot be nil")
	}
	if p.Age < 0 {
		return fmt.Errorf("invalid age: %d", p.Age)
	}
	return nil
} 