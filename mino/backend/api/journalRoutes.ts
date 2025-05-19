const express = require('express');

const router = express.Router();

interface JournalEntry {
    id: number;
    content: string | null;
    title: string | null;
    date: string | null;
}