const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports.books = (req, res) => {
    let offset = 0;
    let count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({
            "message": "QueryString Offset and Count should be numbers "
        });
        return;
    }

    Book.find().skip(offset).limit(count).exec()
        .then(handleGetAllBooksResponse.bind(null, res))
        .catch(handleInternalError.bind(null, res));
};

module.exports.getBook = (req, res) => {
    const bookId = req.params.bookId;
    Book.findById(bookId).exec()
        .then(handleGetOneBookResponse.bind(null, res, bookId))
        .catch(handleInternalError.bind(null, res));
}

module.exports.createBook = (req, res) => {
    console.log("Receive request creating book");
    const book = {};
    copyBook(req, book);
    Book.create(book, (err, book) => {
        console.log("Created book");
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(book);
        }
    })
};

module.exports.updateFullBook = (req, res) => {
    console.log("Receive request update full book");
    findAndUpdateBook(req, res, (req, book) => {
        copyBook(req, book, true);
    });
};

module.exports.updatePartialBook = (req, res) => {
    findAndUpdateBook(req, res, (req, book) => {
        copyBook(req, book, false);
    });
}

module.exports.deleteBook = (req, res) => {
    const bookId = req.params.bookId;
    Book.findByIdAndRemove(bookId).exec()
        .then(handleDeleteBookResponse.bind(null, bookId, res))
        .catch(handleInternalError.bind(null, res));
};

const copyBook = (req, targetBook, override) => {
    if (override || req.body.title) {
        targetBook.title = req.body.title;
    }
    if (override || req.body.authors) {
        targetBook.authors = req.body.authors;
    }
    if (override || parseInt(req.body.pages)) {
        targetBook.pages = parseInt(req.body.pages);
    }
    if (override || parseInt(req.body.rate)) {
        targetBook.rate = parseInt(req.body.rate);
    }
    if (override || req.body.isbn10) {
        targetBook.isbn10 = req.body.isbn10;
    }
    if (override || req.body.isbn13) {
        targetBook.isbn13 = req.body.isbn13
    }
    if (override || parseFloat(req.body.price)) {
        targetBook.price = parseFloat(req.body.price);
    }
    if (override || req.body.publisheDate) {
        targetBook.publisheDate = req.body.publisheDate;
    }
}

const findAndUpdateBook = (req, res, updateBook) => {
    const bookId = req.params.bookId;
    Book.findById(bookId).select("-publisher").exec()
        .then(handleUpdateBook.bind(null, req, res, updateBook))
        .catch(handleInternalError.bind(null, res));
}


module.exports.findBookAndUpdate = (req, res, updateMethod) => {
    const bookId = req.params.bookId;
    Book.findById(bookId).exec()
        .then(handleUpdateOneBook.bind(null, req, res, updateMethod))
        .catch(handleInternalError.bind(null, res));
}

const handleNoContentResponseSucess = (res) => {
    res.status(204).json("");
}

const handleInternalError = (res, err) => {
    console.log("Error finding games");
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
}

function handleGetAllBooksResponse(res, books) {
    res.status(200).json(books);
}

function handleGetOneBookResponse(res, bookId, book) {
    if (!book) {
        res.status(404).json(`{message: Book with id ${bookId} not found}`);
    } else {
        res.status(200).json(book);
    }
}

function handleDeleteBookResponse(bookId, res, book) {
    const response = {
        status: 204,
        message: book
    };
    if (!book) {
        response.status = 404;
        response.message = { "message": `Book with ${bookId} not found` };
    }
    res.status(response.status).json(response.message);
}

function handleUpdateBook(req, res, updateBook, book) {
    if (!book) {
        response.status = 404;
        response.message = { "message": `Book not found` };
    }

    if (response.status != 204) {
        res.status(response.status).json(response.message);
    } else {
        updateBook(req, book);
        book.save()
            .then(handleNoContentResponseSucess.bind(null, res))
            .catch(handleInternalError.bind(null, res));
    }
}

function handleUpdateOneBook(req, res, updateMethod, book) {
    if (!book) {
        response.status = 404;
        response.message = { "message": `Book not found` };
    }
    if (response.status != 204) {
        res.status(response.status).json(response.message);
    } else {
        updateMethod(req, res, book);
    }
}