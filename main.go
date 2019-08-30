package main

import (
	"log"

	r "gopkg.in/rethinkdb/rethinkdb-go.v5"
)

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address: "localhost:32769",
	})
	if err != nil {
		log.Fatal(err)
	}
	err = r.DB("nitifications").Table("message").Insert(map[string]string{
		"msg":  "Hellow world from go",
		"name": "Oribe",
	},
	).Exec(session)
	if err != nil {
		log.Fatal(err)
	}
}
