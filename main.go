package main

import (
	"log"
	"time"

	"github.com/brianvoe/gofakeit"
	r "gopkg.in/rethinkdb/rethinkdb-go.v5"
)

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address: "localhost:32769",
	})
	if err != nil {
		log.Fatal(err)
	}
	for {
		err = r.DB("nitifications").Table("message").Insert(map[string]string{
			"msg":  gofakeit.HackerPhrase(),
			"name": gofakeit.Name(),
		},
		).Exec(session)
		if err != nil {
			log.Fatal(err)
		}
		time.Sleep(time.Millisecond * 200)

	}

}
