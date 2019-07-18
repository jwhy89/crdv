# Civil Rights Data Visualizer (CRDV)

The CRDV is a web application built to make it easy for causual users to work with and understand the data made publicly available by the Department of Education’s Civil Rights Data Collection (More information about the data is available [here](https://www2.ed.gov/about/offices/list/ocr/data.html)). The primary way of interfacing with this data is through the official [CRDC Reporting Tool](https://ocrdata.ed.gov/), a tool that is powerful but clunky and difficult for casual users to use. The CRDV is built for those who wish to understand the data, but don't have the time or patience to learn the current system.

## Built With

- [React](https://reactjs.org/)
- [ChartJS](https://www.chartjs.org/)
- [Semantic-UI](https://semantic-ui.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Installing

1. Clone the project repo to your local machine
2. Create a postgreSQL database titled "CRDV" and run the queries located in the 'database.sql' file
3. `npm install`
4. `npm run server`
5. `npm run client`

The application should now be up and running in your local dev environment. By default, the client runs on port 3000 and the server runs on port 5000

Note: I haven't made the data you'll actually want to fill the database tables with available yet, but I am working on this and will update the readme when I have more information

## Screen Shot

Coming Soon

### Completed Features

- [x] Users can select a scope of a specific state, district, or school
- [x] Users can select available datasets based on what scope they've selected
- [x] Users can view a basic visualization of the selected data
- [x] Users may share page links in order to share datasets with one another

### Next Steps

- [ ] Users can update their selected scope from the visualization page
- [ ] A given visualization shows useful information that helps a user drawn conclusions
- [ ] Users may choose a specific type of data visualization (bar graph, pie chart, etc.)
- [ ] Users may export a specific visualization as a .png

## Authors

* Will Howes

## Acknowledgments

* This project would not have been possible without help from some of the fine people at [Prime Digital Academy](https://primeacademy.io/)
