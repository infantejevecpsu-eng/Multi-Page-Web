
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import '../css/app.css';

function HomePage() {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
            <nav className="bg-slate-900 p-4 text-white">
                <h1 className="text-xl font-bold">Library System</h1>
                <div className="mt-3 flex gap-4 text-sm">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>

            <main className="mx-auto max-w-5xl px-5 py-16">
                <section className="rounded-2xl bg-white p-8 shadow-sm">
                    <p className="mb-3 font-semibold text-blue-600">
                        Welcome to our system
                    </p>
                    <h2 className="mb-4 text-3xl font-bold">
                        Manage Your Products Easily
                    </h2>
                    <p className="mb-6 text-slate-600">
                        A simple management system built with React,
                        Tailwind CSS, Laravel, and MySQL.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
                    >
                        Get Started
                    </Link>
                </section>
            </main>

            <footer className="p-6 text-center text-sm text-slate-500">
                © 2026 Management System
            </footer>
        </div>
    );
}



function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function handleLogin(event) {
        event.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.errors
                        ? Object.values(data.errors).flat().join(' ')
                        : data.message || 'Login failed. Check your credentials.'
                );
                return;
            }

            localStorage.setItem('auth_token', data.token);
            window.location.href = '/dashboard';
        } catch (error) {
            setMessage(
                'Could not connect to Laravel. Check that both servers are running.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <Link to="/" className="text-sm text-blue-600">
                    ← Back to Home
                </Link>

                <h1 className="mt-6 text-3xl font-bold text-slate-800">
                    Welcome Back
                </h1>
                <p className="mt-2 text-slate-500">
                    Sign in to your account
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {message && (
                        <p role="alert" className="text-sm text-red-600">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-blue-600">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}



function RegisterPage() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function handleRegister(event) {
        event.preventDefault();
        setMessage('');

        if (password !== passwordConfirmation) {
            setMessage('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        password_confirmation: passwordConfirmation,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                const errors = data.errors
                    ? Object.values(data.errors).flat().join(' ')
                    : data.message || 'Registration failed.';

                setMessage(errors);
                return;
            }

            localStorage.setItem('auth_token', data.token);
            setMessage('Account created successfully! You can now log in.');
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');
        } catch (error) {
            setMessage(
                'Could not connect to Laravel. Check that your server is running.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <Link to="/" className="text-sm text-blue-600">
                    ← Back to Home
                </Link>

                <h1 className="mt-6 text-3xl font-bold text-slate-800">
                    Create Account
                </h1>
                <p className="mt-2 text-slate-500">
                    Register to get started
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 p-3"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 p-3"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 p-3"
                            placeholder="At least 8 characters"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            className="w-full rounded-lg border border-slate-300 p-3"
                            placeholder="Enter password again"
                        />
                    </div>

                    {message && (
                        <p
                            role="status"
                            className="text-sm text-blue-700"
                        >
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}


function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <h1 className="text-3xl font-bold text-blue-600">
                Library Dashboard
            </h1>

            <p className="mt-3 text-slate-600">
                Welcome to your Library System!
            </p>

            <Link
                to="/books"
                className="mt-6 block rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
            >
                <h2 className="text-xl font-semibold text-blue-600">
                    Book Management
                </h2>

                <p className="mt-2 text-slate-600">
                    Manage your library books here.
                </p>

                <p className="mt-4 font-semibold text-blue-600">
                    Open Books →
                </p>
            </Link>

            <Link
                to="/"
                className="mt-6 inline-block text-blue-600"
            >
                ← Back to Home
            </Link>
        </div>
    );
}

function BooksPage() {
const [title, setTitle] = React.useState('');
const [author, setAuthor] = React.useState('');
const [isbn, setIsbn] = React.useState('');
const [message, setMessage] = React.useState('');
const [books, setBooks] = React.useState([]);
const [loading, setLoading] = React.useState(true);

React.useEffect(() => {
    async function fetchBooks() {
        const token = localStorage.getItem('auth_token');

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/books',
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setBooks(data);
            } else {
                setMessage(data.message || 'Could not load books.');
            }
        } catch (error) {
            setMessage('Could not connect to Laravel.');
        } finally {
            setLoading(false);
        }
    }

    fetchBooks();
}, []);


async function handleAddBook(e) {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('auth_token');

    try {
        const response = await fetch('http://127.0.0.1:8000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                author,
                isbn: isbn || null,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.message || 'Could not add the book.');
            return;
        }

        setMessage('Book added successfully!');
        setTitle('');
        setAuthor('');
        setIsbn('');
    } catch (error) {
        setMessage('Could not connect to Laravel. Check that the server is running.');
    }
}

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <h1 className="text-3xl font-bold text-slate-800">
                Library Books
            </h1>

            <form
    onSubmit={handleAddBook}
    className="mt-6 max-w-lg space-y-4"
>
    <input
    type="text"
    placeholder="Book Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full rounded-lg border p-3"
/>

    <input
    type="text"
    placeholder="Author"
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
    className="w-full rounded-lg border p-3"
/>

    <input
    type="text"
    placeholder="ISBN (optional)"
    value={isbn}
    onChange={(e) => setIsbn(e.target.value)}
    className="w-full rounded-lg border p-3"
/>

    <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
    >
        Add Book
    </button>
</form>
{message && (
    <p className="mt-4 text-blue-700">{message}</p>
)}

<div className="mt-8 max-w-2xl">
    <h2 className="mb-4 text-2xl font-bold text-slate-800">
        Saved Books
    </h2>

    {loading ? (
        <p>Loading books...</p>
    ) : books.length === 0 ? (
        <p className="text-slate-600">
            No books found yet.
        </p>
    ) : (
        <div className="space-y-3">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="rounded-lg bg-white p-4 shadow"
                >
                    <h3 className="text-lg font-semibold">
                        {book.title}
                    </h3>
                    <p className="text-slate-600">
                        Author: {book.author}
                    </p>
                    <p className="text-slate-500">
                        ISBN: {book.isbn || 'Not provided'}
                    </p>
                    
                    <p className="text-sm">
                        Status: {book.available
                            ? 'Available'
                            : 'Borrowed'}
                    </p>

                    <div className="mt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                const title = prompt(
                                    'Book title:',
                                    book.title
                                );
                                if (title === null) return;

                                const author = prompt(
                                    'Book author:',
                                    book.author
                                );
                                if (author === null) return;

                                const isbn = prompt(
                                    'Book ISBN:',
                                    book.isbn || ''
                                );
                                if (isbn === null) return;

                                fetch(
                                    `http://127.0.0.1:8000/api/books/${book.id}`,
                                    {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Accept: 'application/json',
                                            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                                        },
                                        body: JSON.stringify({
                                            title,
                                            author,
                                            isbn,
                                        }),
                                    }
                                )
                                    .then(async (response) => {
                                        const data = await response.json();
                                        if (!response.ok) {
                                            throw new Error(
                                                data.message || 'Could not update book.'
                                            );
                                        }
                                        setMessage('Book updated successfully!');
                                        window.location.reload();
                                    })
                                    .catch((error) => {
                                        setMessage(error.message);
                                    });
                            }}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={async () => {
                                if (!confirm('Delete this book?')) return;

                                try {
                                    const response = await fetch(
                                        `http://127.0.0.1:8000/api/books/${book.id}`,
                                        {
                                            method: 'DELETE',
                                            headers: {
                                                Accept: 'application/json',
                                                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                                            },
                                        }
                                    );

                                    const data = await response.json();

                                    if (!response.ok) {
                                        throw new Error(
                                            data.message || 'Could not delete book.'
                                        );
                                    }

                                    setBooks((currentBooks) =>
                                        currentBooks.filter(
                                            (item) => item.id !== book.id
                                        )
                                    );
                                    setMessage('Book deleted successfully!');
                                } catch (error) {
                                    setMessage(error.message);
                                }
                            }}
                            className="rounded-lg bg-red-600 px-4 py-2 text-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>

            ))}
        </div>
    )}
</div>


            <Link
                to="/dashboard"
                className="mt-6 inline-block text-blue-600 hover:underline"
            >
                ← Back to Dashboard
            </Link>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
		<Route path="/dashboard" element={<DashboardPage />} />
		<Route path="/books" element={<BooksPage />} />
                <Route
                    path="*"
                    element={
                        <div className="p-8 text-center">
                            <h1 className="text-2xl font-bold">Page Not Found</h1>
                            <Link to="/" className="text-blue-600">
                                Return Home
                            </Link>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('react-root')).render(<App />);
