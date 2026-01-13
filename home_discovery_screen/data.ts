import type { Category, PromoCard, Restaurant } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Biryani',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvM8isNBTfSmtYZshzOUNQMtPHxjD-4sgfs3q4jLaQYxgHaeEzbuRB_zD49oW3egMgtVDFVyBkB75S8XJk-52JZALe7EJFabCHR9aZoiajKV6gdcvPQJugnfK9T4-HszJ3nrHpyTEV4-R1fgMeIrbxrk-FNNjc1MyxZdrLEMQP_ywHXtTvk2blvzHaCR-4RNkGG8hLRhk_KLl3B8z9uNYIMDvESFwFqF60JLu-jM1ld02NS5V80-g5tP6pmELh8-0tUf0BiVctLF8',
    isActive: true,
  },
  {
    id: '2',
    name: 'Pizza',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0Mw13v3mtgG9fDlEvP_W6P9627w-nCdz7yN8Eny6g9i7bSUgrZ9AKo6ggZ0f_HdmnWoQBtt0QYlftkrCg_Wgq7fSkQL7tupsw-x0B0kYMCz5jjL1ot4B31O4B6fargtNSQoC9vh5cKAnD0CHscOS0xiUSsuwYqpNupEILVPtRG_jnwZ_LFAWqEhKoCsEw69mMxp4Vy7qQW2YKIKx9ZVhfucM9VkiIpO8kAovP5XH3lAVUrTaDMYImILDZRwcX64IG9S9YV3s5nzo',
  },
  {
    id: '3',
    name: 'North Indian',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJWSBuGbTn8YQJnn-b94bZrZtG2FeXjTKaK7q7RnbrpWsKgY2eKBHeBI8TENkA4SCf3Q_H5AM1H0Pfel9PKRKHXixkTrTV6Q2nsGOYGsAuPV1lhWBow2CWHyc4i82_SmySL6C3XRF-H5IelYR-dFuWJ7qEg4NPi2yq92DH9N4xJJ7WfFUUXvbR7atwyqgRjQ4p5UxHa8S7BGsgCSV20A61JlwtyJa4E9AZlEAjVqSJ2wHZsTVGkx5lYUl_Kf-ZyY8nWqsLwKofd5Y',
  },
  {
    id: '4',
    name: 'Burgers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsnvUCb-CbcH4qOsNOWQtYhwKVXPizL7-XuWbtu_BLO0NbMby8s_EKXRNQWMgMnzebwK4Rh_9AstlhXnrjj6FYp5T4H-40xgJkRJk3z8CiWAJQm1kCCgbaB7cMSfZb8NqEnAMBuV9qARxQs6fhrHCdQRgZduvGdGm-i-X62WPD_6nB8A-NPrpzfhelt7WH_gQAfkpVAy-_Ova3i079oEeHdd--jSZEY-FkOxH7XcNYbsjlm8Yndmv7i6YXlbRTwcc3UDTvV4cvWm8',
  },
  {
    id: '5',
    name: 'Healthy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnFMunN5QWUlrC4rvH8iuKjFGF-dacC2Lt_c5CMQjcJRNC-4PWvmkJsOIH_4jIZX35Hpl92ry_SG3crYQImYkcHqd_irlGB6BLqoYiNI03FvuDaMIsrqy3E8VWehy7Eq8iSbZGNXN3UhqnrsnWJoBp3JZ7SCI3sAOe86LiXSY9AOqb5lTqEHmU5mvCL0JE2fbwPhdMaotSdvsck5u_ot_uAy6OA5bzVcr-ErDcfhRZ03N4blbFcLiO2o9SO15T2CNpDw6iVcW1tEU',
  },
  {
    id: '6',
    name: 'Desserts',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPOFyFAo7au4ZrLIQv0e-uezeDtVftJoE2LSGIhYKK6clmHIC-rc_tUs3KbA1Imedvitoay-tiHBA1vQ4Wrim7LaXwUK48MXZiC8r-P_5g7cj_Apc-Psh1mli6zlQIazlH7i7tY-KQ1maB2yxqvECOHbO9UVQomq4eXYvSzXa321VmJbyvXvjwH_ADO1Y8tUVOfJ3x-Bt2JHAxCfZ9cXlLXikZjUJHB6j3uHBmP4DvzbhXK-zgsuc3oQwTGbNG7veKv-WaD3OgAao',
  },
];

export const promos: PromoCard[] = [
  {
    id: '1',
    title: 'Flash Deal',
    subtitle: 'On your first 3 orders this week',
    discount: '50% OFF',
    buttonText: 'Order Now',
    backgroundColor: '#ec3713',
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA5TLg_QZhTvsUiBrvCy4YoWmt4QIWTb_8kXd9PeRLuXDOJVGbnHu5mQ7eSoaJM2Xg_Wfu0lylmGR4-6kq5USVpRUSHBVvUK5PKazsLzFyoqxgkQPRAlo8XsOCz1O4FRIwaIQsX8-sKGRqSEBCG_7bs3U5OrBiMadtgZ4c1ggJOS13z3sCA9ajjYMSvaozbxoPWfnwQVmysodUNS25Ne5mwSWiaKFO8hQryOOJzwlJOhlY3NQe2fpaF_M1lUv6lOFsSVi2DNphUGU',
    type: 'flash-deal',
  },
  {
    id: '2',
    title: 'Limited Time',
    subtitle: 'Delivery on all premium sushi spots',
    discount: 'FREE',
    buttonText: 'View Deals',
    backgroundColor: '#2d3436',
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp6_ZgGxm5EczR9hDwCnVTN-1SGLpMkLIH-ZuB-XPGPyGneBa5STLmWfonCIJ8J3NOWkE3V5xJzpUPIEn7KrA8IGXa_1v54MuckP0rYl4F-BCwTM7nWb7YBkmZ6zlZlJ2Ixhw_z86jOMuCiK0Z5T_wEA0epcZbZmX6Qutnl6P1MQNingsE_oQlusftckAB12HMV2eYSLnlbYgnWYNuXitmq_QPGWHI3rbpOXNhKNTx6unVAO-XW4Y_KJgXAjBDkOMmcEw0NW0FP9o',
    type: 'limited-time',
  },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Golden Grill',
    cuisine: 'American • Steaks • Burgers',
    rating: 4.8,
    deliveryTime: '25-30 min',
    distance: '1.2 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBphxDUHHPhTTHFAAVHrUX0UY971kgUhIwHcctw99QdAKI3dcYGAOPUIUxmgGxypSYd1Le4PiaSBUOD9V3ztwR3L8jmAqUCuvoMisF96zZwR1rEcyk4XiDY0E96npP2fo7PjjxM0E8-SUgJZqqkWEnXsPNUOgov3w9Ru_YJZuifqhiSlcqhx9cf6WGS0Pc5MMJOtafiBoLs7HgPR8vVQtz3Iq1mZ54osCbUpIStP5lnQXytElUKJTMlrRalWUQRHC_LinHL2GCgoSU',
    hasFreeDelivery: true,
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Pasta di Roma',
    cuisine: 'Italian • Pasta • Wine',
    rating: 4.5,
    deliveryTime: '35-40 min',
    distance: '2.8 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBilknx9nWGnbwW-oo2BbPOETZUfmX96kYzaqJSHN8E4U2mNC7GJVdsolCVBmAnEVasaPYwFptCRGvQZ2IaJdE4Pkd7avYqr09kmvVok4_Q3hOdfVXJqoNSWWhKNhoITrblfw-pm1Szt1NihxXLhNOV5BQwR4n99VJdspsQmE3VCljGLvgq9GvI1L7ZvjRFAJdexLZ2c6SmxQo3dX13gZ8aMzCGoqrOrY7h_NXrBJ_ADCVJVproZ3xuRt6GJUUKQ4755CnzI-Uzd_s',
    hasFreeDelivery: false,
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Sushi Master',
    cuisine: 'Japanese • Sushi • Ramen',
    rating: 4.9,
    deliveryTime: '40-45 min',
    distance: '3.5 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp6_ZgGxm5EczR9hDwCnVTN-1SGLpMkLIH-ZuB-XPGPyGneBa5STLmWfonCIJ8J3NOWkE3V5xJzpUPIEn7KrA8IGXa_1v54MuckP0rYl4F-BCwTM7nWb7YBkmZ6zlZlJ2Ixhw_z86jOMuCiK0Z5T_wEA0epcZbZmX6Qutnl6P1MQNingsE_oQlusftckAB12HMV2eYSLnlbYgnWYNuXitmq_QPGWHI3rbpOXNhKNTx6unVAO-XW4Y_KJgXAjBDkOMmcEw0NW0FP9o',
    hasFreeDelivery: true,
    isFavorite: true,
  },
  {
    id: '4',
    name: 'Burger Palace',
    cuisine: 'Fast Food • Burgers • Fries',
    rating: 4.3,
    deliveryTime: '20-25 min',
    distance: '0.8 km',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsnvUCb-CbcH4qOsNOWQtYhwKVXPizL7-XuWbtu_BLO0NbMby8s_EKXRNQWMgMnzebwK4Rh_9AstlhXnrjj6FYp5T4H-40xgJkRJk3z8CiWAJQm1kCCgbaB7cMSfZb8NqEnAMBuV9qARxQs6fhrHCdQRgZduvGdGm-i-X62WPD_6nB8A-NPrpzfhelt7WH_gQAfkpVAy-_Ova3i079oEeHdd--jSZEY-FkOxH7XcNYbsjlm8Yndmv7i6YXlbRTwcc3UDTvV4cvWm8',
    hasFreeDelivery: false,
    isFavorite: false,
  },
];
