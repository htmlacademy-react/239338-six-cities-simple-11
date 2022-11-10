import { Offers } from '../types/offers';


export const offers: Offers = [
  {
    id: 1,
    title: 'Beautiful & luxurious apartment at great location',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat faucibus est, ac congue eros elementum vitae. Etiam porta, lectus ac aliquet tempus, ipsum lorem convallis ante, ut convallis turpis purus eget turpis. Fusce efficitur massa ac magna tempus, a rhoncus nulla vestibulum. Curabitur a erat ipsum.',
    type: 'Apartment',
    price: 120,
    bedrooms: 3,
    maxAdults: 4,
    rating: 4.5,
    isPremium: true,
    previewImage: 'img/apartment-01.jpg',
    host: {
      name: 'Angelina',
      avatarUrl: 'https://i.pravatar.cc/74',
      isPro: true
    },
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/amsterdam.jpg',
    ],
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Fridge',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Towels',
      'Baby seat',
      'Cabel TV'
    ],
    reviews: [
      {
        author: {
          name: 'Max',
          avatarUrl: 'https://i.pravatar.cc/54?rnd=1',
          isPro: false
        },
        rating: 4.5,
        comment: 'Maecenas eu sem turpis. In faucibus, diam pellentesque cursus volutpat, lectus felis euismod diam, ut tincidunt ligula risus suscipit est. Nam at mi tempor, posuere neque vulputate, vehicula arcu. Sed euismod vitae tortor sodales luctus.',
        date: 'April 2019'
      }
    ]
  },

  {
    id: 2,
    title: 'Wood and stone place',
    description: 'Nunc ac ipsum risus. Nam sed arcu ac sapien sodales porttitor. Donec molestie, orci id euismod ultricies, risus nibh blandit sapien, in pretium dolor magna ac augue. Aliquam tempor ipsum sem. Aliquam ac lacus faucibus, dapibus tortor quis, accumsan nisi. Nam viverra nunc sit amet erat facilisis, vitae malesuada enim tincidunt. Aliquam luctus vehicula vehicula. In sit amet lectus tristique, convallis odio ac, semper nulla. Phasellus interdum mi vel ultrices tincidunt.',
    type: 'Private room',
    price: 80,
    bedrooms: 1,
    maxAdults: 2,
    rating: 3.4,
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    host: {
      name: 'John',
      avatarUrl: 'https://i.pravatar.cc/74',
      isPro: false
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
      'img/amsterdam.jpg'
    ],
    goods: [
      'Wi-Fi',
      'Kitchen',
      'Washing machine',
      'Dishwasher',
      'Baby seat'
    ],
    reviews: [
      {
        author: {
          name: 'Kate',
          avatarUrl: 'https://i.pravatar.cc/54?rnd=1',
          isPro: false
        },
        rating: 4.2,
        comment: 'Nam viverra nunc sit amet erat facilisis, vitae malesuada enim tincidunt. Aliquam luctus vehicula vehicula. In sit amet lectus tristique, convallis odio ac, semper nulla. Phasellus interdum mi vel ultrices tincidunt.',
        date: 'May 2020'
      },
      {
        author: {
          name: 'Ben',
          avatarUrl: 'https://i.pravatar.cc/54?rnd=2',
          isPro: false
        },
        rating: 2.6,
        comment: 'Praesent ut nisl egestas, hendrerit diam eget, egestas tellus. Suspendisse dapibus mattis quam, in commodo nisl scelerisque sit amet. Phasellus in hendrerit quam. Integer fermentum arcu dolor, vitae condimentum nibh pharetra efficitur.',
        date: 'February 2019'
      }
    ]
  },

  {
    id: 3,
    title: 'Canal View Prinsengracht',
    description: 'Sed vel faucibus eros. Nullam erat dui, mattis viverra viverra quis, sollicitudin quis elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris elit orci, pretium vel augue nec, pretium feugiat magna. Suspendisse potenti. Phasellus et interdum arcu, eu porta sapien. Praesent ut nisl egestas, hendrerit diam eget, egestas tellus. Suspendisse dapibus mattis quam, in commodo nisl scelerisque sit amet. Phasellus in hendrerit quam. Integer fermentum arcu dolor, vitae condimentum nibh pharetra efficitur.',
    type: 'Apartment',
    price: 130,
    bedrooms: 2,
    maxAdults: 3,
    rating: 4,
    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    host: {
      name: 'Ben',
      avatarUrl: 'https://i.pravatar.cc/74',
      isPro: true
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
    ],
    goods: [],
    reviews: [
      {
        author: {
          name: 'Max',
          avatarUrl: 'https://i.pravatar.cc/54?rnd=1',
          isPro: false
        },
        rating: 4,
        comment: 'Mauris vitae risus lorem. Donec rutrum pretium cursus. In vitae elementum neque, eu eleifend justo. Praesent molestie, ante et consectetur elementum, lectus leo tempus nisl, non rutrum tortor neque ut tortor. In dictum ipsum ultrices tempus vulputate.',
        date: 'March 2021'
      }
    ]
  },

  {
    id: 4,
    title: 'Nice, cozy, warm big bed apartment',
    description: 'Maecenas in metus vitae mauris elementum imperdiet. Ut ullamcorper nunc tellus, sed venenatis nisi volutpat at. Aenean nec orci porttitor, tristique ante eget, luctus magna. Ut nec mattis dui. Nam turpis tellus, laoreet non eros non, finibus iaculis ligula. Praesent non turpis est. Maecenas nisi magna, pretium vel iaculis et, ornare eget neque. In consectetur et elit vel porttitor.',
    type: 'Apartment',
    price: 150,
    bedrooms: 3,
    maxAdults: 3,
    rating: 4.8,
    isPremium: false,
    previewImage: 'img/room.jpg',
    host: {
      name: 'Max',
      avatarUrl: 'https://i.pravatar.cc/74',
      isPro: false
    },
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Baby seat',
      'Cabel TV'
    ],
    reviews: []
  }
];
