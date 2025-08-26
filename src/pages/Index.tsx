import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviews: number;
  description: string;
  year: number;
  pages: number;
  isFavorite: boolean;
}

interface Note {
  id: number;
  bookId: number;
  content: string;
  page: number;
  date: string;
}

interface Review {
  id: number;
  bookId: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [activeTab, setActiveTab] = useState('catalog');
  const [newNote, setNewNote] = useState('');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  const books: Book[] = [
    {
      id: 1,
      title: 'Война и мир',
      author: 'Лев Толстой',
      genre: 'Классика',
      rating: 4.8,
      reviews: 2847,
      description: 'Эпический роман о русском обществе в эпоху наполеоновских войн',
      year: 1869,
      pages: 1408,
      isFavorite: true
    },
    {
      id: 2,
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      genre: 'Фантастика',
      rating: 4.9,
      reviews: 1925,
      description: 'Роман о любви, добре и зле в советской Москве',
      year: 1967,
      pages: 480,
      isFavorite: false
    },
    {
      id: 3,
      title: 'Преступление и наказание',
      author: 'Федор Достоевский',
      genre: 'Классика',
      rating: 4.7,
      reviews: 3521,
      description: 'Психологический роман о моральных дилеммах',
      year: 1866,
      pages: 671,
      isFavorite: true
    },
    {
      id: 4,
      title: 'Гарри Поттер и философский камень',
      author: 'Дж. К. Роулинг',
      genre: 'Фэнтези',
      rating: 4.6,
      reviews: 5632,
      description: 'Первая книга о юном волшебнике Гарри Поттере',
      year: 1997,
      pages: 223,
      isFavorite: false
    },
    {
      id: 5,
      title: 'Анна Каренина',
      author: 'Лев Толстой',
      genre: 'Классика',
      rating: 4.5,
      reviews: 2156,
      description: 'История трагической любви в дворянском обществе',
      year: 1877,
      pages: 864,
      isFavorite: false
    },
    {
      id: 6,
      title: '1984',
      author: 'Джорж Оруэлл',
      genre: 'Антиутопия',
      rating: 4.8,
      reviews: 4891,
      description: 'Роман-предупреждение о тоталитарном обществе',
      year: 1949,
      pages: 328,
      isFavorite: true
    }
  ];

  const notes: Note[] = [
    {
      id: 1,
      bookId: 1,
      content: 'Потрясающая сцена первого бала Наташи Ростовой. Толстой мастерски передает волнение и радость молодости.',
      page: 312,
      date: '2024-08-20'
    },
    {
      id: 2,
      bookId: 3,
      content: 'Внутренний монолог Раскольникова после преступления показывает глубину его душевных терзаний.',
      page: 156,
      date: '2024-08-18'
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      bookId: 1,
      author: 'Анна К.',
      rating: 5,
      text: 'Величайший роман всех времен! Каждый раз открываю что-то новое.',
      date: '2024-08-15'
    },
    {
      id: 2,
      bookId: 2,
      author: 'Михаил П.',
      rating: 5,
      text: 'Булгаков создал невероятный мир, где реальность переплетается с мистикой.',
      date: '2024-08-10'
    }
  ];

  const genres = ['Все', 'Классика', 'Фантастика', 'Фэнтези', 'Антиутопия'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const favoriteBooks = books.filter(book => book.isFavorite);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name={i < Math.floor(rating) ? "Star" : "StarHalf"} 
        size={16} 
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  const toggleFavorite = (bookId: number) => {
    // В реальном приложении здесь была бы логика обновления состояния
    console.log(`Toggle favorite for book ${bookId}`);
  };

  const addNote = () => {
    if (newNote.trim() && selectedBook) {
      // В реальном приложении здесь была бы логика добавления заметки
      console.log(`Adding note for book ${selectedBook}: ${newNote}`);
      setNewNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Домашняя Библиотека</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant={activeTab === 'catalog' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('catalog')}
              className="flex items-center space-x-2"
            >
              <Icon name="Library" size={16} />
              <span>Каталог</span>
            </Button>
            <Button
              variant={activeTab === 'favorites' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('favorites')}
              className="flex items-center space-x-2"
            >
              <Icon name="Heart" size={16} />
              <span>Избранное</span>
            </Button>
            <Button
              variant={activeTab === 'notes' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('notes')}
              className="flex items-center space-x-2"
            >
              <Icon name="StickyNote" size={16} />
              <span>Заметки</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/50 rounded-2xl p-6 backdrop-blur">
            <div className="flex-1 w-full md:max-w-md">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск книг или авторов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/70"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className="text-sm"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <TabsContent value="catalog" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 bg-card/70 backdrop-blur border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                          {book.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">{book.author}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {book.genre}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {book.year} • {book.pages} стр.
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(book.id)}
                        className="p-2"
                      >
                        <Icon 
                          name="Heart" 
                          size={18} 
                          className={book.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(book.rating)}
                        <span className="text-sm font-medium ml-2">{book.rating}</span>
                        <span className="text-xs text-muted-foreground">({book.reviews})</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Отзывы читателей:</div>
                      {reviews
                        .filter(review => review.bookId === book.id)
                        .slice(0, 1)
                        .map((review) => (
                          <div key={review.id} className="bg-muted/30 rounded-lg p-3 text-sm">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-xs">{review.author}</span>
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-xs">{review.text}</p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="text-center py-2">
              <Icon name="Heart" size={32} className="mx-auto text-red-500 mb-2" />
              <h2 className="text-2xl font-semibold mb-1">Избранные книги</h2>
              <p className="text-muted-foreground">Ваши любимые произведения</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favoriteBooks.map((book) => (
                <Card key={book.id} className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg leading-tight">
                          {book.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">{book.author}</p>
                        <Badge variant="secondary" className="text-xs w-fit">
                          {book.genre}
                        </Badge>
                      </div>
                      <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-1">
                      {renderStars(book.rating)}
                      <span className="text-sm font-medium ml-2">{book.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {book.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notes */}
          <TabsContent value="notes" className="space-y-6">
            <div className="text-center py-2">
              <Icon name="StickyNote" size={32} className="mx-auto text-primary mb-2" />
              <h2 className="text-2xl font-semibold mb-1">Мои заметки</h2>
              <p className="text-muted-foreground">Ваши мысли о прочитанном</p>
            </div>
            
            {/* Add new note */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="PlusCircle" size={20} />
                  Добавить заметку
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <select 
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={selectedBook || ''}
                  onChange={(e) => setSelectedBook(Number(e.target.value))}
                >
                  <option value="">Выберите книгу</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} - {book.author}
                    </option>
                  ))}
                </select>
                <Textarea
                  placeholder="Ваши мысли о книге..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={addNote} disabled={!selectedBook || !newNote.trim()}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить заметку
                </Button>
              </CardContent>
            </Card>

            {/* Existing notes */}
            <div className="space-y-4">
              {notes.map((note) => {
                const book = books.find(b => b.id === note.bookId);
                return (
                  <Card key={note.id} className="bg-card/70">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{book?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {book?.author} • Страница {note.page}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed bg-muted/30 rounded-lg p-3">
                        {note.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border/40 px-4 py-2">
        <div className="flex justify-around">
          <Button
            variant={activeTab === 'catalog' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('catalog')}
            className="flex flex-col items-center space-y-1 h-auto py-2"
          >
            <Icon name="Library" size={18} />
            <span className="text-xs">Каталог</span>
          </Button>
          <Button
            variant={activeTab === 'favorites' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('favorites')}
            className="flex flex-col items-center space-y-1 h-auto py-2"
          >
            <Icon name="Heart" size={18} />
            <span className="text-xs">Избранное</span>
          </Button>
          <Button
            variant={activeTab === 'notes' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('notes')}
            className="flex flex-col items-center space-y-1 h-auto py-2"
          >
            <Icon name="StickyNote" size={18} />
            <span className="text-xs">Заметки</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;