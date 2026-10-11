<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return response()->json(
            Book::latest()->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:50',
        ]);

        $book = Book::create($validated);

        return response()->json([
            'message' => 'Book added successfully!',
            'book' => $book,
        ], 201);
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'isbn' => 'sometimes|nullable|string|max:50',
            'available' => 'sometimes|boolean',
        ]);

        $book->update($validated);

        return response()->json([
            'message' => 'Book updated successfully!',
            'book' => $book,
        ]);
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json([
            'message' => 'Book deleted successfully!',
        ]);
    }
}
