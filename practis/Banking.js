/**
 * --------------------------------------------------------
 * TASK 1: Banking System – Transaction & Balance Validator
 * --------------------------------------------------------
 * * Processes bank account transactions with strict validation 
 * and robust try...catch...finally error handling.
 */

// Custom Error Class for specific transaction issues
class TransactionError extends Error {
    constructor(message, transactionData) {
        super(message);
        this.name = 'TransactionError';
        this.data = transactionData;
    }
}

/**
 * Helper function to validate and apply a single transaction.
 * This function's internal operations are wrapped in a try/catch
 * to allow the main function's catch block to differentiate errors.
 * * @param {number} currentBalance - The current balance of the account.
 * @param {object} transaction - The transaction object (e.g., { type: 'Deposit', amount: 100 }).
 * @returns {{newBalance: number, reason: string}} - The new balance and a reason string (if rejected).
 */
function validateAndApplyTransaction(currentBalance, transaction) {
    const { type, amount } = transaction;

    // 1. Transaction Type Validation
    if (!type) {
        throw new new TransactionError("Transaction type is missing.", transaction);
    }
    const normalizedType = String(type).trim().toLowerCase();

    if (normalizedType !== 'deposit' && normalizedType !== 'withdraw') {
        throw new TransactionError(`Transaction type is unknown: ${type}.`, transaction);
    }

    // 2. Amount Conversion and Validation
    const amountValue = Number(amount);

    if (isNaN(amountValue)) {
        throw new TransactionError(`Amount is not a valid number: ${amount}.`, transaction);
    }

    if (amountValue <= 0) {
        throw new TransactionError(`Amount is zero or negative: ${amountValue}.`, transaction);
    }

    // 3. Apply Rules
    let newBalance = currentBalance;
    let reason = '';

    if (normalizedType === 'deposit') {
        newBalance = currentBalance + amountValue;
        reason = 'Applied';
    } else if (normalizedType === 'withdraw') {
        if (amountValue > currentBalance) {
            throw new TransactionError(`Withdrawal amount ($${amountValue.toFixed(2)}) is greater than available balance ($${currentBalance.toFixed(2)}).`, transaction);
        }
        newBalance = currentBalance - amountValue;
        reason = 'Applied';
    }

    return { newBalance, reason };
}


/**
 * Main function to process the bank account transactions.
 * This function implements the mandatory try, catch, and finally blocks.
 * * @param {object} accountData - The account details and list of transactions.
 * @returns {object} - The final account summary.
 */
function processBankTransactions(accountData) {
    // Clone the input data structure for internal use to follow the "original input must not be modified" rule.
    const finalSummary = {
        accountNumber: accountData.accountNumber,
        accountHolderName: accountData.accountHolderName,
        currency: accountData.currency,
        initialBalance: accountData.initialBalance,
        finalBalance: null,
        appliedTransactions: [],
        rejectedTransactions: []
    };

    let currentBalance = 0;
    let processingLog = 'Processing started.';

    try {
        // --- Try Block: All Transaction Processing Logic ---

        // 1. Convert the initial balance into a valid number safely.
        const initialBalanceValue = Number(accountData.initialBalance);
        if (isNaN(initialBalanceValue) || initialBalanceValue < 0) {
            throw new Error(`InvalidInitialBalance: Initial balance is invalid or negative: ${accountData.initialBalance}`);
        }
        currentBalance = initialBalanceValue;
        finalSummary.initialBalance = currentBalance;

        // 2. Process each transaction
        accountData.transactions.forEach((transaction, index) => {
            const transactionCopy = { ...transaction, id: index + 1 }; // Add ID for logging

            try {
                const { newBalance, reason } = validateAndApplyTransaction(currentBalance, transactionCopy);

                // If successful, update the balance and record the applied transaction
                currentBalance = newBalance;
                finalSummary.appliedTransactions.push({ ...transactionCopy, finalBalance: currentBalance, status: reason });

            } catch (err) {
                // Handle a specific TransactionError (Validation/Rule Rejection)
                if (err instanceof TransactionError) {
                    finalSummary.rejectedTransactions.push({ ...transactionCopy, reason: err.message });
                } else {
                    // Re-throw any other unexpected error to be caught by the main catch block
                    throw err;
                }
            }
        });

        // Set the final balance after all transactions are processed
        finalSummary.finalBalance = currentBalance;
        processingLog = 'Processing completed successfully.';

    } catch (error) {
        // --- Catch Block: Handle System Errors ---

        // This handles critical errors (e.g., Invalid Initial Balance, unexpected runtime errors)
        console.error("--- ❌ CRITICAL SYSTEM ERROR ---");
        console.error("System Error:", error.message);
        processingLog = `Processing failed due to a System Error: ${error.name || 'Error'} - ${error.message}`;

        // Ensure finalBalance is set to the last known valid state or null
        finalSummary.finalBalance = currentBalance || null;

    } finally {
        // --- Finally Block: Generate Log and Display Completion ---

        // 3. Generate a processing log (audit message)
        finalSummary.auditLog = processingLog;

        // 4. Display a completion message and final summary
        console.log("\n=======================================================");
        console.log("✅ PROCESSING COMPLETE");
        console.log("=======================================================");

        // Display the final output object
        console.log(JSON.stringify(finalSummary, null, 2));
    }

    return finalSummary;
}

// --------------------------------------------------------
// --- Demonstration Input ---
// --------------------------------------------------------

const ACCOUNT_INPUT = {
    accountNumber: "123456789",
    accountHolderName: "Jane Doe",
    initialBalance: "1000.50", // Initial balance as a string
    currency: "USD",
    transactions: [
        // 1. Valid Deposit
        { type: "Deposit", amount: 500 },
        // 2. Valid Withdrawal
        { type: "Withdraw", amount: 250.50 },
        // 3. Rejection: Amount is zero
        { type: "Deposit", amount: 0 },
        // 4. Rejection: Amount is negative
        { type: "Withdraw", amount: -100 },
        // 5. Rejection: Amount is not a valid number (string)
        { type: "Deposit", amount: "abc" },
        // 6. Rejection: Unknown type
        { type: "Transfer", amount: 100 },
        // 7. Valid Deposit
        { type: "Deposit", amount: 200 },
        // 8. Rejection: Withdrawal amount greater than balance
        { type: "Withdraw", amount: 5000 },
        // 9. Rejection: Type is missing
        { amount: 50 },
        // 10. Valid Withdrawal (after 7)
        { type: "Withdraw", amount: 300 }
    ]
};

// --------------------------------------------------------
// --- Execution ---
// --------------------------------------------------------

processBankTransactions(ACCOUNT_INPUT);

// --- Example of a SYSTEM CRASH (Corrupted Initial Input) ---
// const CRASH_INPUT = {
//     accountNumber: "999",
//     accountHolderName: "Corrupt User",
//     initialBalance: "NOT A NUMBER", // This will trigger the main Catch Block
//     currency: "USD",
//     transactions: [{ type: "Deposit", amount: 100 }]
// };
// processBankTransactions(CRASH_INPUT);
class TransactionError extends Error {
    constructor(message) {
        super(message);
        this.name = "TransactionError";
    }
}

function parseAmount(amount, fieldName = "amount") {
    if (amount === undefined || amount === null) {
        throw new TransactionError(`Invalid ${fieldName}: Cannot be undefined or null.`);
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
        throw new TransactionError(`Invalid ${fieldName}: "${amount}" is not a valid number.`);
    }

    return numericAmount;
}

// Ensure the `processBankTransactions` function is defined, as it's called later.
// This is a minimal placeholder to make the example runnable; the full implementation
// would need to be provided from the user's context if it's not already in the file.
// Assuming the user's snippet was *inside* this function, this part would not be needed.
// However, the context shows `processBankTransactions` being called, but its definition
// is cut off at the beginning of the provided snippet.
// For the purpose of solving the "error" of missing definitions, these are crucial.
/*
function processBankTransactions(accountData) {
    // ... (rest of the function from the user's codebase)
}
*/
