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

interface Chapter {
  id: number;
  title: string;
  content: string;
}

interface BookContent {
  bookId: number;
  chapters: Chapter[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [activeTab, setActiveTab] = useState('catalog');
  const [newNote, setNewNote] = useState('');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [readingBook, setReadingBook] = useState<number | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [bookmarks, setBookmarks] = useState<{bookId: number, chapter: number, position: number}[]>([]);

  const books: Book[] = [
    // Классика XIX века
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
      title: 'Анна Каренина',
      author: 'Лев Толстой',
      genre: 'Классика',
      rating: 4.7,
      reviews: 2156,
      description: 'История трагической любви в дворянском обществе',
      year: 1877,
      pages: 864,
      isFavorite: false
    },
    {
      id: 3,
      title: 'Преступление и наказание',
      author: 'Федор Достоевский',
      genre: 'Классика',
      rating: 4.9,
      reviews: 3521,
      description: 'Психологический роман о моральных дилеммах и искуплении',
      year: 1866,
      pages: 671,
      isFavorite: true
    },
    {
      id: 4,
      title: 'Братья Карамазовы',
      author: 'Федор Достоевский',
      genre: 'Классика',
      rating: 4.8,
      reviews: 1892,
      description: 'Философский роман о вере, сомнениях и семейных тайнах',
      year: 1880,
      pages: 840,
      isFavorite: false
    },
    {
      id: 5,
      title: 'Идиот',
      author: 'Федор Достоевский',
      genre: 'Классика',
      rating: 4.6,
      reviews: 1654,
      description: 'Роман о князе Мышкине - "положительно прекрасном человеке"',
      year: 1869,
      pages: 640,
      isFavorite: false
    },
    {
      id: 6,
      title: 'Бесы',
      author: 'Федор Достоевский',
      genre: 'Классика',
      rating: 4.5,
      reviews: 1234,
      description: 'Политический роман о революционном движении в России',
      year: 1872,
      pages: 768,
      isFavorite: false
    },
    {
      id: 7,
      title: 'Евгений Онегин',
      author: 'Александр Пушкин',
      genre: 'Поэзия',
      rating: 4.7,
      reviews: 3245,
      description: 'Роман в стихах о "лишнем человеке" русского дворянства',
      year: 1833,
      pages: 384,
      isFavorite: true
    },
    {
      id: 8,
      title: 'Капитанская дочка',
      author: 'Александр Пушкин',
      genre: 'Историческая проза',
      rating: 4.5,
      reviews: 2876,
      description: 'Исторический роман о пугачевском восстании',
      year: 1836,
      pages: 128,
      isFavorite: false
    },
    {
      id: 9,
      title: 'Пиковая дама',
      author: 'Александр Пушкин',
      genre: 'Повесть',
      rating: 4.6,
      reviews: 1987,
      description: 'Мистическая повесть о страсти к азартным играм',
      year: 1834,
      pages: 64,
      isFavorite: false
    },
    {
      id: 10,
      title: 'Герой нашего времени',
      author: 'Михаил Лермонтов',
      genre: 'Классика',
      rating: 4.5,
      reviews: 2453,
      description: 'Роман о "лишнем человеке" Печорине',
      year: 1840,
      pages: 192,
      isFavorite: false
    },
    {
      id: 11,
      title: 'Мертвые души',
      author: 'Николай Гоголь',
      genre: 'Сатира',
      rating: 4.4,
      reviews: 1876,
      description: 'Сатирическая поэма о похождениях Чичикова',
      year: 1842,
      pages: 352,
      isFavorite: false
    },
    {
      id: 12,
      title: 'Ревизор',
      author: 'Николай Гоголь',
      genre: 'Драматургия',
      rating: 4.6,
      reviews: 2134,
      description: 'Комедия о чиновничьем произволе и взяточничестве',
      year: 1836,
      pages: 128,
      isFavorite: false
    },
    {
      id: 13,
      title: 'Шинель',
      author: 'Николай Гоголь',
      genre: 'Повесть',
      rating: 4.5,
      reviews: 1567,
      description: 'Повесть о "маленьком человеке" Акакии Башмачкине',
      year: 1842,
      pages: 48,
      isFavorite: false
    },
    {
      id: 14,
      title: 'Отцы и дети',
      author: 'Иван Тургенев',
      genre: 'Классика',
      rating: 4.3,
      reviews: 1892,
      description: 'Роман о конфликте поколений и нигилизме',
      year: 1862,
      pages: 256,
      isFavorite: false
    },
    {
      id: 15,
      title: 'Дворянское гнездо',
      author: 'Иван Тургенев',
      genre: 'Классика',
      rating: 4.2,
      reviews: 1234,
      description: 'Роман о любви и судьбе русского дворянства',
      year: 1859,
      pages: 224,
      isFavorite: false
    },
    {
      id: 16,
      title: 'Рудин',
      author: 'Иван Тургенев',
      genre: 'Классика',
      rating: 4.1,
      reviews: 987,
      description: 'Первый роман Тургенева о "лишнем человеке"',
      year: 1856,
      pages: 160,
      isFavorite: false
    },
    {
      id: 17,
      title: 'Обломов',
      author: 'Иван Гончаров',
      genre: 'Классика',
      rating: 4.4,
      reviews: 1654,
      description: 'Роман о русской лени и "обломовщине"',
      year: 1859,
      pages: 512,
      isFavorite: false
    },
    {
      id: 18,
      title: 'Что делать?',
      author: 'Николай Чернышевский',
      genre: 'Социальная проза',
      rating: 4.0,
      reviews: 876,
      description: 'Роман о "новых людях" и социальных идеалах',
      year: 1863,
      pages: 384,
      isFavorite: false
    },
    {
      id: 19,
      title: 'Гроза',
      author: 'Александр Островский',
      genre: 'Драматургия',
      rating: 4.3,
      reviews: 1567,
      description: 'Драма о купеческих нравах и женской судьбе',
      year: 1859,
      pages: 96,
      isFavorite: false
    },
    {
      id: 20,
      title: 'Бесприданница',
      author: 'Александр Островский',
      genre: 'Драматургия',
      rating: 4.4,
      reviews: 1345,
      description: 'Драма о трагической судьбе девушки без приданого',
      year: 1879,
      pages: 128,
      isFavorite: false
    },
    // Литература XX века
    {
      id: 21,
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      genre: 'Фантастика',
      rating: 4.9,
      reviews: 5432,
      description: 'Роман о любви, добре и зле в советской Москве',
      year: 1967,
      pages: 480,
      isFavorite: true
    },
    {
      id: 22,
      title: 'Белая гвардия',
      author: 'Михаил Булгаков',
      genre: 'Историческая проза',
      rating: 4.6,
      reviews: 2134,
      description: 'Роман о семье Турбиных в революционном Киеве',
      year: 1925,
      pages: 320,
      isFavorite: false
    },
    {
      id: 23,
      title: 'Собачье сердце',
      author: 'Михаил Булгаков',
      genre: 'Сатира',
      rating: 4.8,
      reviews: 3456,
      description: 'Сатирическая повесть об эксперименте профессора Преображенского',
      year: 1925,
      pages: 128,
      isFavorite: true
    },
    {
      id: 24,
      title: 'Доктор Живаго',
      author: 'Борис Пастернак',
      genre: 'Классика',
      rating: 4.5,
      reviews: 2876,
      description: 'Роман о судьбе интеллигенции в эпоху революций',
      year: 1957,
      pages: 672,
      isFavorite: false
    },
    {
      id: 25,
      title: 'Тихий Дон',
      author: 'Михаил Шолохов',
      genre: 'Эпопея',
      rating: 4.7,
      reviews: 1987,
      description: 'Эпопея о донском казачестве в эпоху войн и революций',
      year: 1940,
      pages: 1504,
      isFavorite: false
    },
    {
      id: 26,
      title: 'Поднятая целина',
      author: 'Михаил Шолохов',
      genre: 'Соцреализм',
      rating: 4.2,
      reviews: 1234,
      description: 'Роман о коллективизации на Дону',
      year: 1932,
      pages: 704,
      isFavorite: false
    },
    {
      id: 27,
      title: 'Архипелаг ГУЛАГ',
      author: 'Александр Солженицын',
      genre: 'Документальная проза',
      rating: 4.8,
      reviews: 3421,
      description: 'Художественно-документальное исследование репрессивной системы СССР',
      year: 1973,
      pages: 1872,
      isFavorite: true
    },
    {
      id: 28,
      title: 'Один день Ивана Денисовича',
      author: 'Александр Солженицын',
      genre: 'Документальная проза',
      rating: 4.6,
      reviews: 2345,
      description: 'Повесть об одном дне заключенного в сталинском лагере',
      year: 1962,
      pages: 128,
      isFavorite: false
    },
    {
      id: 29,
      title: 'В круге первом',
      author: 'Александр Солженицын',
      genre: 'Документальная проза',
      rating: 4.7,
      reviews: 1876,
      description: 'Роман о судьбах заключенных в "шарашке"',
      year: 1968,
      pages: 768,
      isFavorite: false
    },
    {
      id: 30,
      title: 'Мы',
      author: 'Евгений Замятин',
      genre: 'Антиутопия',
      rating: 4.5,
      reviews: 2987,
      description: 'Роман-антиутопия о тоталитарном государстве будущего',
      year: 1924,
      pages: 224,
      isFavorite: false
    },
    {
      id: 31,
      title: 'Котлован',
      author: 'Андрей Платонов',
      genre: 'Философская проза',
      rating: 4.4,
      reviews: 1456,
      description: 'Повесть-притча о строительстве "общепролетарского дома"',
      year: 1930,
      pages: 160,
      isFavorite: false
    },
    {
      id: 32,
      title: 'Чевенгур',
      author: 'Андрей Платонов',
      genre: 'Философская проза',
      rating: 4.3,
      reviews: 1123,
      description: 'Роман о поисках коммунизма в русской провинции',
      year: 1929,
      pages: 416,
      isFavorite: false
    },
    {
      id: 33,
      title: 'А зори здесь тихие...',
      author: 'Борис Васильев',
      genre: 'Военная проза',
      rating: 4.8,
      reviews: 4321,
      description: 'Повесть о подвиге девушек-зенитчиц в годы войны',
      year: 1969,
      pages: 224,
      isFavorite: true
    },
    {
      id: 34,
      title: 'В списках не значился',
      author: 'Борис Васильев',
      genre: 'Военная проза',
      rating: 4.7,
      reviews: 2876,
      description: 'Роман о защитнике Брестской крепости',
      year: 1974,
      pages: 256,
      isFavorite: false
    },
    {
      id: 35,
      title: 'Они сражались за Родину',
      author: 'Михаил Шолохов',
      genre: 'Военная проза',
      rating: 4.6,
      reviews: 2134,
      description: 'Роман о Великой Отечественной войне',
      year: 1959,
      pages: 416,
      isFavorite: false
    },
    {
      id: 36,
      title: 'Судьба человека',
      author: 'Михаил Шолохов',
      genre: 'Военная проза',
      rating: 4.7,
      reviews: 3456,
      description: 'Рассказ о солдате, прошедшем плен и потерявшем семью',
      year: 1957,
      pages: 64,
      isFavorite: false
    },
    // Современная литература
    {
      id: 37,
      title: 'Кысь',
      author: 'Татьяна Толстая',
      genre: 'Постапокалипсис',
      rating: 4.3,
      reviews: 1987,
      description: 'Роман о России после ядерной катастрофы',
      year: 2000,
      pages: 384,
      isFavorite: false
    },
    {
      id: 38,
      title: 'Зулейха открывает глаза',
      author: 'Гузель Яхина',
      genre: 'Современная проза',
      rating: 4.6,
      reviews: 5432,
      description: 'Роман о судьбе татарской женщины в 1930-е годы',
      year: 2015,
      pages: 512,
      isFavorite: true
    },
    {
      id: 39,
      title: 'Дети мои',
      author: 'Гузель Яхина',
      genre: 'Современная проза',
      rating: 4.4,
      reviews: 2876,
      description: 'Роман о немецком учителе в послевоенном Казахстане',
      year: 2018,
      pages: 496,
      isFavorite: false
    },
    {
      id: 40,
      title: 'Лавр',
      author: 'Евгений Водолазкин',
      genre: 'Современная проза',
      rating: 4.5,
      reviews: 3214,
      description: 'Роман о средневековом лекаре и его духовном пути',
      year: 2013,
      pages: 440,
      isFavorite: false
    },
    {
      id: 41,
      title: 'Авиатор',
      author: 'Евгений Водолазкин',
      genre: 'Современная проза',
      rating: 4.3,
      reviews: 1876,
      description: 'Роман о человеке, очнувшемся после долгого забвения',
      year: 2016,
      pages: 416,
      isFavorite: false
    },
    {
      id: 42,
      title: 'Тель-Авив',
      author: 'Дина Рубина',
      genre: 'Современная проза',
      rating: 4.4,
      reviews: 2134,
      description: 'Роман о художнице, переехавшей в Израиль',
      year: 2015,
      pages: 512,
      isFavorite: false
    },
    {
      id: 43,
      title: 'Почерк Леонардо',
      author: 'Дина Рубина',
      genre: 'Современная проза',
      rating: 4.2,
      reviews: 1567,
      description: 'Роман о женщине-левше и ее необычном даре',
      year: 2008,
      pages: 464,
      isFavorite: false
    },
    {
      id: 44,
      title: 'Обитель',
      author: 'Захар Прилепин',
      genre: 'Историческая проза',
      rating: 4.6,
      reviews: 2876,
      description: 'Роман о Соловецком лагере особого назначения',
      year: 2014,
      pages: 752,
      isFavorite: false
    },
    {
      id: 45,
      title: 'Санькя',
      author: 'Захар Прилепин',
      genre: 'Современная проза',
      rating: 4.1,
      reviews: 1234,
      description: 'Роман о молодом революционере начала XXI века',
      year: 2006,
      pages: 320,
      isFavorite: false
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
      bookId: 21,
      author: 'Михаил П.',
      rating: 5,
      text: 'Булгаков создал невероятный мир, где реальность переплетается с мистикой.',
      date: '2024-08-10'
    },
    {
      id: 3,
      bookId: 3,
      author: 'Екатерина С.',
      rating: 5,
      text: 'Достоевский гениально показал внутренний мир человека, совершившего преступление.',
      date: '2024-08-12'
    },
    {
      id: 4,
      bookId: 7,
      author: 'Дмитрий В.',
      rating: 5,
      text: 'Пушкин - наше всё! Онегин актуален и сегодня.',
      date: '2024-08-08'
    },
    {
      id: 5,
      bookId: 23,
      author: 'Ольга М.',
      rating: 5,
      text: 'Сатира Булгакова остается острой спустя век. Шариков живёт среди нас!',
      date: '2024-08-05'
    },
    {
      id: 6,
      bookId: 27,
      author: 'Александр Т.',
      rating: 5,
      text: 'Важнейшее произведение XX века. Каждый должен прочитать.',
      date: '2024-07-30'
    },
    {
      id: 7,
      bookId: 33,
      author: 'Мария Н.',
      rating: 5,
      text: 'Плачу каждый раз, когда перечитываю. Подвиг этих девочек нельзя забыть.',
      date: '2024-08-01'
    },
    {
      id: 8,
      bookId: 38,
      author: 'Айгуль К.',
      rating: 5,
      text: 'Яхина потрясающе описала судьбу татарской женщины. Очень пронзительно.',
      date: '2024-07-25'
    },
    {
      id: 9,
      bookId: 40,
      author: 'Владимир Р.',
      rating: 4,
      text: 'Водолазкин создал удивительный роман о времени и вечности.',
      date: '2024-07-20'
    },
    {
      id: 10,
      bookId: 11,
      author: 'Елена П.',
      rating: 4,
      text: 'Гоголь мастерски высмеял пороки российской действительности.',
      date: '2024-07-15'
    }
  ];

  // Содержание книг (демо-версии первых глав)
  const bookContents: BookContent[] = [
    {
      bookId: 1,
      chapters: [
        {
          id: 1,
          title: 'Том первый. Часть первая. Глава I',
          content: `— Eh bien, mon prince, Gênes et Lucques ne sont plus que des apanages, des поместья, de la famille Buonaparte. Non, je vous préviens, que si vous ne me dites pas que nous avons la guerre, si vous vous permettez encore de pallier toutes les infamies, toutes les atrocités de cet Antichrist (ma parole, j'y crois) — je ne vous connais plus, vous n'êtes plus mon ami, vous n'êtes plus мой верный раб, comme vous dites.

Так говорила в июле 1805 года известная Анна Павловна Шерер, фрейлина и приближенная императрицы, встречая важного и чиновного князя Василия, первого приехавшего на ее вечер.

Анна Павловна кашляла несколько дней, у неё был грипп, как она говорила (грипп был тогда новое слово, употреблявшееся только редкими).

— Ах, какая прелестная женщина эта Анна Павловна! — подумал князь Василий.

Князь Василий был человек государственный, один из тех придворных людей, которые раз навсегда выбирают направление и потом уже никогда не изменяют его. Его направление было поклонение власти, и власть была для него не отвлеченным понятием блага государственного, а конкретной возможностью для него и его семьи получать ордена, деньги, отличия.`
        },
        {
          id: 2,
          title: 'Том первый. Часть первая. Глава II',
          content: `— Если здоровье позволит, — сказал князь. — У вас нынче большой вечер?

— Нет, очень маленький. Только самые необходимые люди, — сказала Анна Павловна, обдумывая свой вечер. — Мортмарт будет, и аббат. Вы знаете аббата? Он очень интересный человек.

— А! это тот жесткий человек? Я его не знаю лично, но много слышал. Говорят, что он очень учен.

— Да, это необыкновенный ум. Он такой глубокий, высокий... Вы знаете, иногда люди слишком умны для того, чтобы их можно было понимать. Это тот случай.

— А! — с сомнением проговорил князь Василий. — Он говорит, что Buonaparte большой человек.

— Боже мой! — в ужасе воскликнула Анна Павловна. — Как вы можете, князь! Что он говорит такое! Ah! mon prince, vous me donnez de la peine. Я не знала, что вы буонапартист.`
        }
      ]
    },
    {
      bookId: 21,
      chapters: [
        {
          id: 1,
          title: 'Глава 1. Никогда не разговаривайте с неизвестными',
          content: `В час жаркого весеннего заката на Патриарших прудах появились два гражданина. Первый из них, одетый в летнюю серенькую пару, был маленького роста, упитан, лыс, свою приличную шляпу пирожком нес в руке, а на хорошо выбритом лице его помещались сверхъестественных размеров очки в черной роговой оправе. Второй – плечистый, рыжеватый, вихрастый молодой человек в заломленной на затылок клетчатой кепке – был в ковбойке, жеваных белых брюках и в черных тапочках.

Первый был не кто иной, как Михаил Александрович Берлиоз, председатель правления одной из крупнейших московских литературных ассоциаций, сокращенно именуемой МАССОЛИТ, и редактор толстого художественного журнала, а молодой спутник его – поэт Иван Николаевич Понырев, пишущий под псевдонимом Бездомный.

Попав в тень чуть зеленеющих лип, писатели первым долгом бросились к пестро раскрашенной будочке с надписью «Пиво и воды».`
        },
        {
          id: 2,
          title: 'Глава 2. Понтий Пилат',
          content: `В белом плаще с кровавым подбоем, шаркающей кавалерийской походкой, ранним утром четырнадцатого числа весеннего месяца нисана в крытую колоннаду между двумя крыльями дворца Ирода Великого вышел прокуратор Иудеи Понтий Пилат.

Более всего на свете прокуратор ненавидел запах розового масла, и все теперь предвещало нехороший день, так как запах этот начал преследовать прокуратора с рассвета.

Прокуратору казалось, что розовый запах источают кипарисы и пальмы в саду, что к запаху кожи и конвоя примешивается проклятая розовая струя. От флигелей в тылу дворца, где расположилась первая когорта двенадцатого молниеносного легиона, заносило дымком в колоннаду через верхнюю площадку сада, и к этому дымку подмешивался все тот же жирный розовый дух.`
        }
      ]
    },
    {
      bookId: 7,
      chapters: [
        {
          id: 1,
          title: 'Глава первая',
          content: `«Мой дядя самых честных правил,
Когда не в шутку занемог,
Он уважать себя заставил
И лучше выдумать не мог.
Его пример другим наука;
Но, боже мой, какая скука
С больным сидеть и день и ночь,
Не отходя ни шагу прочь!
Какое низкое коварство
Полуживого забавлять,
Ему подушки поправлять,
Печально подносить лекарство,
Вздыхать и думать про себя:
Когда же черт возьмет тебя!»

Так думал молодой повеса,
Летя в пыли на почтовых,
Всевышней волею Зевеса
Наследник всех своих родных.
Друзья Людмилы и Руслана!
С героем моего романа
Без предисловий, сей же час
Позвольте познакомить вас:
Онегин, добрый мой приятель,
Родился на брегах Невы,
Где, может быть, родились вы
Или блистали, мой читатель;
Там некогда гулял и я:
Но вреден север для меня.`
        }
      ]
    },
    {
      bookId: 23,
      chapters: [
        {
          id: 1,
          title: 'Глава I',
          content: `Была январская вьюжная ночь. Профессор Филипп Филиппович Преображенский в шубе на черно-бурой лисе и в каракулевой шапке влетел в свой подъезд, отряхиваясь. В вестибюле кальсонами вниз висел разорванный на клочья жилец Шариков, и через стеклянную дверь был виден калабуховский швейцар в синей поддевке, валяющийся на полу среди осколков разбитого графина. Оба были мертвецки пьяны.

— О боже мой! — воскликнул профессор. — Опять какая-то история. Дарья Петровна, — крикнул он, — идите сюда немедленно!

Из недр квартиры, из прихожей появилась женщина в белом переднике.

— Ах, Филипп Филиппович, наконец-то вы приехали! А я уж думала...

— Что случилось еще?

— Ах, до чего же мерзко! Представьте себе, сегодня утром являются всякие... Я уж и не знаю, кто они такие... То ли жильцы, то ли не жильцы... в кожаных куртках...

— А-а... М-да... Понятно. И что же?`
        }
      ]
    }
  ];

  const genres = [
    'Все', 'Классика', 'Поэзия', 'Историческая проза', 'Повесть', 
    'Сатира', 'Драматургия', 'Социальная проза', 'Фантастика', 'Эпопея', 
    'Соцреализм', 'Документальная проза', 'Антиутопия', 'Философская проза',
    'Военная проза', 'Постапокалипсис', 'Современная проза'
  ];

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

  const openReader = (bookId: number) => {
    setReadingBook(bookId);
    setCurrentChapter(0);
    setActiveTab('reader');
  };

  const closeReader = () => {
    setReadingBook(null);
    setActiveTab('catalog');
  };

  const addBookmark = () => {
    if (readingBook) {
      setBookmarks(prev => [...prev, { bookId: readingBook, chapter: currentChapter, position: 0 }]);
    }
  };

  const getCurrentBookContent = () => {
    if (!readingBook) return null;
    return bookContents.find(content => content.bookId === readingBook);
  };

  const getCurrentBook = () => {
    if (!readingBook) return null;
    return books.find(book => book.id === readingBook);
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
            {readingBook && (
              <Button
                variant="outline"
                onClick={closeReader}
                className="flex items-center space-x-2"
              >
                <Icon name="X" size={16} />
                <span>Закрыть чтение</span>
              </Button>
            )}
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
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => openReader(book.id)}
                        disabled={!bookContents.find(content => content.bookId === book.id)}
                      >
                        <Icon name="BookOpen" size={14} className="mr-1" />
                        Читать
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedBook(book.id);
                          setActiveTab('notes');
                        }}
                      >
                        <Icon name="Plus" size={14} className="mr-1" />
                        Заметка
                      </Button>
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

          {/* Reader */}
          <TabsContent value="reader" className="space-y-0">
            {readingBook && (
              <div className="fixed inset-0 bg-background z-50 flex flex-col">
                {/* Reader Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/40 bg-background/95 backdrop-blur">
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" onClick={closeReader}>
                      <Icon name="ArrowLeft" size={18} />
                    </Button>
                    <div>
                      <h2 className="font-semibold text-lg">{getCurrentBook()?.title}</h2>
                      <p className="text-sm text-muted-foreground">{getCurrentBook()?.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={addBookmark}>
                      <Icon name="Bookmark" size={16} className="mr-1" />
                      Закладка
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Chapter Navigation */}
                {getCurrentBookContent() && getCurrentBookContent()!.chapters.length > 1 && (
                  <div className="flex items-center justify-between p-4 bg-muted/20 border-b border-border/20">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                      disabled={currentChapter === 0}
                    >
                      <Icon name="ChevronLeft" size={16} className="mr-1" />
                      Предыдущая
                    </Button>
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {getCurrentBookContent()?.chapters[currentChapter]?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {currentChapter + 1} из {getCurrentBookContent()?.chapters.length}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentChapter(Math.min(getCurrentBookContent()!.chapters.length - 1, currentChapter + 1))}
                      disabled={currentChapter === getCurrentBookContent()!.chapters.length - 1}
                    >
                      Следующая
                      <Icon name="ChevronRight" size={16} className="ml-1" />
                    </Button>
                  </div>
                )}

                {/* Reading Content */}
                <div className="flex-1 overflow-auto">
                  <div className="max-w-3xl mx-auto p-6">
                    <div className="prose prose-lg max-w-none">
                      <h1 className="text-2xl font-bold mb-6 text-center">
                        {getCurrentBookContent()?.chapters[currentChapter]?.title}
                      </h1>
                      <div className="text-base leading-relaxed whitespace-pre-line">
                        {getCurrentBookContent()?.chapters[currentChapter]?.content}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reader Controls */}
                <div className="flex items-center justify-center p-4 border-t border-border/40 bg-background/95 backdrop-blur">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                      disabled={currentChapter === 0}
                    >
                      <Icon name="SkipBack" size={16} />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{currentChapter + 1}</span>
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full transition-all" 
                          style={{ 
                            width: `${((currentChapter + 1) / (getCurrentBookContent()?.chapters.length || 1)) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm">{getCurrentBookContent()?.chapters.length || 0}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentChapter(Math.min(getCurrentBookContent()!.chapters.length - 1, currentChapter + 1))}
                      disabled={currentChapter === getCurrentBookContent()!.chapters.length - 1}
                    >
                      <Icon name="SkipForward" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
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