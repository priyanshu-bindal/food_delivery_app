export const USER_PROFILE = {
    name: 'Priyanshu Bindal',
    email: 'priyanshu.bindal@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
    isGoldMember: true,
};

export const MENU_ACTIONS = [
    { id: '1', title: 'My Orders', icon: 'receipt-outline', route: 'Orders' },
    { id: '2', title: 'Address Book', icon: 'location-outline', route: 'AddressBook' },
    { id: '3', title: 'Payments & Refunds', icon: 'card-outline', route: 'Payments' },
    { id: '4', title: 'Help & Support', icon: 'help-circle-outline', route: 'HelpSupport' },
    { id: '5', title: 'Settings', icon: 'settings-outline', route: 'Settings' },
];

export const PAST_ORDERS = [
    {
        id: '101',
        restaurantName: 'The Golden Grill',
        items: '2x Spicy Burgers, 1x Coke',
        price: 450,
        date: 'Today, 12:30 PM',
        status: 'Delivered',
        rating: 0,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyJTIwcGxhdGV8ZW58MHx8MHx8fDA%3D',
    },
    {
        id: '102',
        restaurantName: 'Pizza Paradise',
        items: '1x Large Pepperoni, 1x Garlic Bread',
        price: 850,
        date: 'Yesterday, 8:15 PM',
        status: 'Delivered',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D',
    },
    {
        id: '103',
        restaurantName: 'Dessert Haven',
        items: '2x Chocolate Mousse, 1x Brownie',
        price: 320,
        date: '10 Jan, 4:00 PM',
        status: 'Delivered',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D',
    },
];
