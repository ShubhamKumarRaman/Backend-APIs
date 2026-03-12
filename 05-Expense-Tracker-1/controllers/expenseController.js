// CRUD operations for expenses

const Expense = require('../models/Expense')

//Add expense
exports.addExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;

    const expense = await Expense.create({
        user: req.user._id,
        title,
        amount,
        category,
        date
    });

    res.status(201).json(expense);
}

//Get expenses with filters
exports.getExpenses = async (req, res) => {
    const { filter, startDate, endDate } = req.query;

    let query = { user: req.user._id };

    const now = new Date();

    if (filter === 'week') {
        query.date = { $gte: new Date(now.setDate(now.getDate() - 7)) }
    }
    if (filter === 'month') {
        query.date = { $gte: new Date(now.setMonth(now.getMonth() - 1)) }
    }
    if (filter === '3month') {
        query.date = { $gte: new Date(now.setMonth(now.getMonth() - 3)) }
    }

    if (filter === "custom") {
        query.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }

    const expenses = await Expense.find(query).sort({ date: -1 })

    res.json(expenses);
}

//Update expense
exports.updateExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        res.status(404);
        throw new Error('Expense not found');
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Unauthorized");
    }

    const updated = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(updated);
}

//Delete expense
exports.deleteExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        res.status(404);
        throw new Error("Expense not found");
    }

    await expense.deleteOne();

    res.json({ message: "expense removed" })
}