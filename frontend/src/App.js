// Application Data
const appData = {
    accounts: [
      {
        id: "acc1",
        name: "Primary Checking",
        type: "checking",
        balance: 4250.75,
        currency: "USD",
        color: "#3B82F6"
      },
      {
        id: "acc2", 
        name: "Savings Account",
        type: "savings",
        balance: 12850.25,
        currency: "USD",
        color: "#10B981"
      },
      {
        id: "acc3",
        name: "Credit Card",
        type: "credit",
        balance: -1250.50,
        currency: "USD", 
        color: "#EF4444"
      }
    ],
    categories: [
      {id: "food", name: "Food & Dining", color: "#F59E0B", icon: "🍕"},
      {id: "transport", name: "Transportation", color: "#3B82F6", icon: "🚗"}, 
      {id: "shopping", name: "Shopping", color: "#8B5CF6", icon: "🛍️"},
      {id: "entertainment", name: "Entertainment", color: "#06B6D4", icon: "🎬"},
      {id: "utilities", name: "Utilities", color: "#84CC16", icon: "⚡"},
      {id: "health", name: "Healthcare", color: "#EC4899", icon: "🏥"},
      {id: "education", name: "Education", color: "#F97316", icon: "📚"},
      {id: "other", name: "Other", color: "#6B7280", icon: "📋"}
    ],
    transactions: [
      {
        id: "t1",
        accountId: "acc1",
        amount: -45.67,
        category: "food",
        description: "Dinner at Italian Restaurant",
        date: "2025-08-12",
        type: "expense"
      },
      {
        id: "t2", 
        accountId: "acc1",
        amount: -25.00,
        category: "transport",
        description: "Uber to downtown",
        date: "2025-08-12",
        type: "expense"
      },
      {
        id: "t3",
        accountId: "acc2",
        amount: 2500.00,
        category: "other",
        description: "Salary deposit",
        date: "2025-08-10",
        type: "income"
      },
      {
        id: "t4",
        accountId: "acc1",
        amount: -120.50,
        category: "shopping",
        description: "Amazon purchase",
        date: "2025-08-09",
        type: "expense"
      },
      {
        id: "t5",
        accountId: "acc3",
        amount: -89.99,
        category: "utilities",
        description: "Internet bill",
        date: "2025-08-08",
        type: "expense"
      },
      {
        id: "t6",
        accountId: "acc1",
        amount: -65.00,
        category: "health",
        description: "Pharmacy",
        date: "2025-08-07",
        type: "expense"
      },
      {
        id: "t7",
        accountId: "acc1",
        amount: -200.00,
        category: "entertainment",
        description: "Concert tickets",
        date: "2025-08-05",
        type: "expense"
      },
      {
        id: "t8",
        accountId: "acc2",
        amount: -300.00,
        category: "education",
        description: "Online course",
        date: "2025-08-03",
        type: "expense"
      }
    ],
    budgets: [
      {category: "food", allocated: 500, spent: 285.67, remaining: 214.33},
      {category: "transport", allocated: 200, spent: 125.00, remaining: 75.00},
      {category: "entertainment", allocated: 300, spent: 200.00, remaining: 100.00},
      {category: "shopping", allocated: 400, spent: 320.50, remaining: 79.50},
      {category: "utilities", allocated: 150, spent: 89.99, remaining: 60.01}
    ],
    monthlyTrends: [
      {month: "June", income: 3200, expenses: 2450},
      {month: "July", income: 3200, expenses: 2680},
      {month: "August", income: 3200, expenses: 1856}
    ]
  };
  
  // Global Variables
  let charts = {};
  let currentView = 'dashboard';
  
  // Utility Functions
  function formatCurrency(amount) {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(absAmount);
    
    return amount < 0 ? `-${formatted}` : formatted;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  function getCategoryById(categoryId) {
    return appData.categories.find(cat => cat.id === categoryId);
  }
  
  function getAccountById(accountId) {
    return appData.accounts.find(acc => acc.id === accountId);
  }
  
  // View Management
  function showView(viewId) {
    console.log('Switching to view:', viewId);
    
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add('active');
    } else {
      console.error('View not found:', viewId);
      return;
    }
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Find and activate the corresponding nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const onclick = item.getAttribute('onclick');
      if (onclick && onclick.includes(`'${viewId}'`)) {
        item.classList.add('active');
      }
    });
    
    currentView = viewId;
    
    // Initialize view-specific content
    if (viewId === 'analytics') {
      setTimeout(() => initializeCharts(), 100);
    }
  }
  
  // Dashboard Functions
  function renderRecentTransactions() {
    const container = document.getElementById('recentTransactions');
    if (!container) return;
    
    const recentTransactions = appData.transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    container.innerHTML = recentTransactions.map(transaction => {
      const category = getCategoryById(transaction.category);
      const account = getAccountById(transaction.accountId);
      
      return `
        <div class="transaction-item" onclick="viewTransaction('${transaction.id}')">
          <div class="transaction-icon">
            ${category ? category.icon : '📋'}
          </div>
          <div class="transaction-details">
            <div class="transaction-description">${transaction.description}</div>
            <div class="transaction-meta">${formatDate(transaction.date)} • ${account.name}</div>
          </div>
          <div class="transaction-amount ${transaction.amount < 0 ? 'negative' : 'positive'}">
            ${formatCurrency(transaction.amount)}
          </div>
        </div>
      `;
    }).join('');
  }
  
  function viewTransaction(transactionId) {
    const transaction = appData.transactions.find(t => t.id === transactionId);
    if (transaction) {
      const category = getCategoryById(transaction.category);
      const account = getAccountById(transaction.accountId);
      alert(`Transaction Details:\n${transaction.description}\n${formatCurrency(transaction.amount)}\nCategory: ${category ? category.name : 'Unknown'}\nAccount: ${account.name}\nDate: ${formatDate(transaction.date)}`);
    }
  }
  
  // Account Functions
  function viewAccountTransactions(accountId) {
    const account = getAccountById(accountId);
    const accountTransactions = appData.transactions.filter(t => t.accountId === accountId);
    
    const transactionList = accountTransactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(t => {
        const category = getCategoryById(t.category);
        return `• ${t.description} - ${formatCurrency(t.amount)} (${category ? category.name : 'Unknown'})`;
      }).join('\n');
    
    alert(`${account.name} Transactions:\n\nBalance: ${formatCurrency(account.balance)}\nRecent Transactions:\n${transactionList}\n\n(Showing last 5 transactions)`);
  }
  
  // Add Expense Functions
  function initializeExpenseForm() {
    const form = document.getElementById('expenseForm');
    const dateInput = document.getElementById('date');
    
    if (!form || !dateInput) return;
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    
    form.addEventListener('submit', handleExpenseSubmit);
  }
  
  function handleExpenseSubmit(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const accountId = document.getElementById('account').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    
    // Validate form
    if (!amount || !accountId || !category || !description || !date) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create new transaction
    const newTransaction = {
      id: `t${Date.now()}`,
      accountId: accountId,
      amount: -Math.abs(amount), // Expenses are negative
      category: category,
      description: description,
      date: date,
      type: 'expense'
    };
    
    // Add to transactions
    appData.transactions.unshift(newTransaction);
    
    // Update account balance
    const account = getAccountById(accountId);
    if (account) {
      account.balance -= Math.abs(amount);
      updateAccountBalance(accountId, account.balance);
    }
    
    // Update budget if exists
    const budget = appData.budgets.find(b => b.category === category);
    if (budget) {
      budget.spent += Math.abs(amount);
      budget.remaining = budget.allocated - budget.spent;
    }
    
    // Show success message
    showSuccessMessage('Expense added successfully!');
    
    // Reset form
    event.target.reset();
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    
    // Refresh dashboard data
    renderRecentTransactions();
    updateBudgetProgress();
    updateAccountBalances();
    updateSummaryStats();
  }
  
  function updateAccountBalance(accountId, newBalance) {
    const accountCard = document.querySelector(`[data-account="${accountId}"] .account-balance`);
    if (accountCard) {
      accountCard.textContent = formatCurrency(newBalance);
    }
    
    const accountDetailCard = document.querySelector(`[data-account="${accountId}"] .account-balance-large`);
    if (accountDetailCard) {
      accountDetailCard.textContent = formatCurrency(newBalance);
    }
  }
  
  function updateAccountBalances() {
    appData.accounts.forEach(account => {
      updateAccountBalance(account.id, account.balance);
    });
  }
  
  function updateBudgetProgress() {
    const budgetItems = document.querySelectorAll('.budget-item');
    budgetItems.forEach((item, index) => {
      if (appData.budgets[index]) {
        const budget = appData.budgets[index];
        const percentage = Math.min((budget.spent / budget.allocated) * 100, 100);
        const progressFill = item.querySelector('.progress-fill');
        const budgetText = item.querySelector('.budget-header span:last-child');
        
        if (progressFill) {
          progressFill.style.width = `${percentage}%`;
        }
        
        if (budgetText) {
          budgetText.textContent = `${formatCurrency(budget.spent)} / ${formatCurrency(budget.allocated)}`;
        }
      }
    });
  }
  
  function updateSummaryStats() {
    const totalIncome = appData.transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = Math.abs(appData.transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0));
    
    const netBalance = totalIncome - totalExpenses;
    
    const incomeElement = document.querySelector('.stat-value.income');
    const expenseElement = document.querySelector('.stat-value.expense');
    const balanceElement = document.querySelector('.stat-value.positive');
    
    if (incomeElement) incomeElement.textContent = formatCurrency(totalIncome);
    if (expenseElement) expenseElement.textContent = formatCurrency(-totalExpenses);
    if (balanceElement) {
      balanceElement.textContent = formatCurrency(netBalance);
      balanceElement.className = `stat-value ${netBalance >= 0 ? 'positive' : 'expense'}`;
    }
  }
  
  function showSuccessMessage(message) {
    // Create or update success message
    let successDiv = document.querySelector('.success-message');
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      const formContainer = document.querySelector('.form-container');
      if (formContainer) {
        formContainer.prepend(successDiv);
      }
    }
    
    successDiv.textContent = message;
    successDiv.classList.add('show');
    
    setTimeout(() => {
      successDiv.classList.remove('show');
    }, 3000);
  }
  
  // Analytics Functions
  function initializeCharts() {
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    charts = {};
    
    createTrendsChart();
    createCategoryChart();
    createWeeklyChart();
  }
  
  function createTrendsChart() {
    const canvas = document.getElementById('trendsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.trends = new Chart(ctx, {
      type: 'line',
      data: {
        labels: appData.monthlyTrends.map(trend => trend.month),
        datasets: [
          {
            label: 'Income',
            data: appData.monthlyTrends.map(trend => trend.income),
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Expenses',
            data: appData.monthlyTrends.map(trend => trend.expenses),
            borderColor: '#B4413C',
            backgroundColor: 'rgba(180, 65, 60, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
  }
  
  function createCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Calculate category totals
    const categoryTotals = {};
    appData.transactions
      .filter(t => t.amount < 0)
      .forEach(transaction => {
        const amount = Math.abs(transaction.amount);
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += amount;
      });
    
    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325'];
    
    charts.category = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories.map(catId => {
          const category = getCategoryById(catId);
          return category ? category.name : 'Unknown';
        }),
        datasets: [{
          data: amounts,
          backgroundColor: colors.slice(0, categories.length),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }
  
  function createWeeklyChart() {
    const canvas = document.getElementById('weeklyChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Generate sample weekly data
    const weeklyData = [
      { day: 'Mon', amount: 150 },
      { day: 'Tue', amount: 75 },
      { day: 'Wed', amount: 200 },
      { day: 'Thu', amount: 125 },
      { day: 'Fri', amount: 300 },
      { day: 'Sat', amount: 180 },
      { day: 'Sun', amount: 90 }
    ];
    
    charts.weekly = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weeklyData.map(d => d.day),
        datasets: [{
          label: 'Daily Spending',
          data: weeklyData.map(d => d.amount),
          backgroundColor: '#FFC185',
          borderColor: '#F59E0B',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
  }
  
  // AI Assistant Functions
  function initializeChatInterface() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendChat');
    
    if (sendButton) {
      sendButton.addEventListener('click', handleChatSend);
    }
    
    if (chatInput) {
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          handleChatSend();
        }
      });
    }
  }
  
  function handleChatSend() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(message);
      addChatMessage(response, 'ai');
    }, 1000);
  }
  
  function addChatMessage(message, sender) {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    messageDiv.innerHTML = `
      <div class="message-content">${message}</div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('food') || message.includes('dining') || message.includes('restaurant')) {
      return "Based on your spending patterns, you've spent $285.67 on food this month (57% of your budget). Consider meal prepping 2-3 times per week to save $100-150 monthly. Would you like specific meal planning tips?";
    }
    
    if (message.includes('transport') || message.includes('uber') || message.includes('gas')) {
      return "Your transportation costs are $125 this month. Consider using public transport or carpooling for regular commutes to save up to $50 monthly. Would you like me to analyze your transportation patterns?";
    }
    
    if (message.includes('budget') || message.includes('save') || message.includes('money')) {
      return "You're doing well with most categories! Your shopping expenses are at 80% of budget. Consider reallocating some funds from entertainment (only 67% used) to shopping for better balance.";
    }
    
    if (message.includes('subscription') || message.includes('utilities')) {
      return "Review your recurring subscriptions and utilities. You spent $89.99 on utilities this month. Cancel unused services to save approximately $30-40 monthly.";
    }
    
    return "I can help you analyze your spending patterns and suggest ways to save money. Try asking about specific categories like 'food expenses' or 'budget optimization'. What would you like to know about your finances?";
  }
  
  // Navigation event listeners
  function setupNavigation() {
    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const onclick = this.getAttribute('onclick');
        if (onclick) {
          // Extract the view ID from onclick attribute
          const match = onclick.match(/showView\('([^']+)'\)/);
          if (match) {
            showView(match[1]);
          }
        }
      });
    });
    
    // FAB button
    const fab = document.querySelector('.fab');
    if (fab) {
      fab.addEventListener('click', function(e) {
        e.preventDefault();
        showView('add-expense');
      });
    }
    
    // Account cards
    document.querySelectorAll('.account-card').forEach(card => {
      card.addEventListener('click', function() {
        const accountId = this.dataset.account;
        if (accountId) {
          viewAccountTransactions(accountId);
        }
      });
    });
  }
  
  // Initialization
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing ExpenseTracker Pro...');
    
    // Setup navigation
    setupNavigation();
    
    // Initialize views
    showView('dashboard');
    
    // Initialize dashboard
    renderRecentTransactions();
    updateAccountBalances();
    updateBudgetProgress();
    updateSummaryStats();
    
    // Initialize forms and chat
    initializeExpenseForm();
    initializeChatInterface();
    
    console.log('ExpenseTracker Pro initialized successfully');
  });
  
  // Global functions for HTML onclick attributes (backup)
  window.showView = showView;
  window.viewAccountTransactions = viewAccountTransactions;
  window.viewTransaction = viewTransaction;