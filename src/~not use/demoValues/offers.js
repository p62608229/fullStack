export const demoOffersList = [
    {
        offerCode: "ABC123",
        offerUserId: "user123",
        priceForWork: 50,
        note: "Task 1",
        pricePerVisit: 10,
        profession: 1,
        daysToWork: [
            { date: "21/03/24", fromhour: "14:00", tohour: "16:00" },
            { date: "24/03/24", fromhour: "14:00", tohour: "16:00" }
        ],
        inCalendar: true
    },
    {
        offerCode: "DEF456",
        offerUserId: "user456",
        priceForWork: 70,
        note: "Task 2",
        pricePerVisit: 15,
        profession: 2,
        daysToWork: [
            { date: "22/03/24", fromhour: "10:00", tohour: "13:00" },
        ],
        inCalendar: false
    }
];
