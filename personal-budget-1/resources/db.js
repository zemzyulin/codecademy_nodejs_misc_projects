// Data: all possible catagories & budget
const categories = ['Housing', 'Transportation', 'Food', 'Utilities', 'Insurance', 'Healthcare', 
                    'Investing', 'Personal Spending', 'Entertainment', 'Miscellaneous'];
const totalBudget = 10000;
let currentBudget = 10000;

// Create 3 random preset envelopes
let envelopeCount = 1;
const createEnvelope = () => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    categories.splice(categories.indexOf(category), 1);
    const budget = Math.floor(Math.random() * (totalBudget / 3) / 10) * 10;
    currentBudget -= budget;
    return { 
        id: `${envelopeCount++}`,
        category: category,
        budget: budget
    }
}
const envelopes = new Array(3).fill(0).map(createEnvelope);

// Validate envelope
const validEnvelope = (envelope) => {
    if (Object.keys(envelope).length !== 3) { return null }
    if (!envelope.category || !envelope.budget) { return null }
    envelope.budget = Number(envelope.budget);
    if (typeof envelope.category !== 'string' || isNaN(envelope.budget)) { return null }
    return envelope;
}

// Get envelope by Id
const envelopeById = id => {
    return envelopes.find(element => element.id === id.toString());
}

// Add envelope to db
const addEnvelope = envelope => {
    envelope.id = `0`;
    envelope = validEnvelope(envelope);
    if (!envelope) { return null }
    if (currentBudget - envelope.budget < 0) { return null }
    envelope.id = `${envelopeCount++}`;
    currentBudget -= envelope.budget;
    //console.log(currentBudget);
    envelopes.push(envelope);
    return envelope;
}

// Update envelope in db
const updateEnvelope = envelope => {
    envelope = validEnvelope(envelope);
    if (!envelope) { return null }
    const envIndex = envelopes.indexOf(envelopeById(envelope.id));
    let formerBudget = envelopes[envIndex].budget;
    if (currentBudget + formerBudget - envelope.budget < 0) { return null }
    currentBudget += formerBudget - envelope.budget;
    envelopes[envIndex] = envelope;
    return envelopes[envIndex];
}

// Delete envelope from db
const deleteEnvelope = id => {
    const envelope = envelopeById(id);
    if (!envelope) { return null }
    envelopes.splice(envelopes.indexOf(envelope), 1);
    return true;
}

// Transfer between envelopes
const transfer = (fromId, toId, amount) => {
    const fromEnvelope = envelopeById(fromId);
    const toEnvelope = envelopeById(toId);
    amount = Number(amount);
    if (!fromEnvelope || !toEnvelope || !amount || isNaN(amount)) { return null }
    if (fromEnvelope.budget - amount < 0) { return null }
    fromEnvelope.budget -= amount;
    toEnvelope.budget += amount;
    return true;
}

module.exports = { envelopes, envelopeById, addEnvelope, updateEnvelope, deleteEnvelope, transfer }