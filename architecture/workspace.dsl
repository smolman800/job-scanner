workspace {

    model {
        user = person "User"
        job_hunting_site_1 = softwareSystem "Job Hunting Site 1"
        job_hunting_site_2 = softwareSystem "Job Hunting Site 2"
        job_hunting_site_n = softwareSystem "Job Hunting Site n"       
        softwareSystem = softwareSystem "Job Scanner" {
            frontend = container "Frontend" "Serves content" React
            db = container "Database" "" PostgresQL
            backend = container "Backend" {
                scraper = component "Scraper Service" "" Django
                api = component "API Service" "" Django
            }
        }
        user -> frontend "Uses"
        frontend -> api "Uses"
        api -> db "Reads/Writes"
        scraper -> db "Reads/Writes"
        scraper -> job_hunting_site_1 "Scrapes from"
        scraper -> job_hunting_site_2 "Scrapes from"
        scraper -> job_hunting_site_n "Scrapes from"
    }

    views {
        systemContext softwareSystem {
            include *
            autolayout lr
        }

        container softwareSystem {
            include *
            autolayout lr
        }
        
        component Backend {
            include * 
            autolayout lr
        }


        theme default
        
    }

}