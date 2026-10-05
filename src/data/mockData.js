export const dashboardData = {
    totalAssets: 25,
    assignedAssets: 15,
    availableAssets: 7,
    repairAssets: 3,
};

export const assetStatusData = [
    { name: "Assigned", value: 15},
    { name: "Available", value: 7},
    { name: "Repair", value: 3},
];

export const assets = [
    {
        id: 1,
        name: "Dell Laptop",
        type: "Laptop",
        serial_number: "DELL001",
        status: " Available",
    },
    {
        id: 2,
        name: "HP Monitor",
        type: "Monitor",
        serial_number: "HP001",
        status: " Assigned",
    },
    {
        id: 3,
        name: "Office Chair",
        type: "Furniture",
        serial_number: "CHAIR001",
        status: " Available",
    },
];

export const inventoryItems = [
    {
        id: 1,
        item_type: "Keyboard",
        quantity: 10,
        threshold: 3,
    },
    {
        id: 2,
        item_type: "Mouse",
        quantity: 15,
        threshold: 5,
    },
    {
        id: 2,
        item_type: "USB Cable",
        quantity: 4,
        threshold: 5,
    },
];

export const tickets = [
    {
        id: 1,
        asset: "Dell Laptop",
        issue: "Laptop screen is not working",
        status: "Open",
        assigned_technician: "employee1",
    },
    {
        id: 2,
        asset: "HP Monitor",
        issue: "Display is flickering",
        status: "In Progress",
        assigned_technician: "employee1",
    },
];