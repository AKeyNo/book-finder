# Book Finder

A book tracker using the Google Books API for searching books. Users are able to rate books they find or leave book reviews.

## Prerequisites

Make sure that you have installed [Git](https://git-scm.com/) and [Docker](https://docs.docker.com/get-docker/).

## Installation
In your favorite shell, type the following in order.
```
git clone https://github.com/AKeyNo/book-finder.git
cd book-finder
docker build -t book-finder .
docker-compose up --build
```
After running these commands, it will be on http://localhost:3000/.

## Built with
* [React](https://reactjs.org/)
* [Material-UI](https://mui.com/)
* [Google Books API](https://developers.google.com/books)
* [Docker](https://www.docker.com/)

## License
Book Finder is released under the MIT License. Check the [LICENSE](https://github.com/AKeyNo/book-finder/blob/main/LICENSE) file for more information.
