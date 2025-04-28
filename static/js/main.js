/**
 * HabitVerse X - Main JavaScript
 * Handles UI interactions, animations, and dynamic content
 */

document.addEventListener('DOMContentLoaded', function() {
      // Mobile menu toggle
    const mobileMenuButton = document.querySelector('#mobile-menu-button');
    const mobileMenu = document.querySelector('#mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // User dropdown toggle
    const userMenuButton = document.querySelector('#user-menu-button');
    const userDropdown = document.querySelector('#user-dropdown');
    
    if (userMenuButton && userDropdown) {
        userMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target) && !userDropdown.classList.contains('hidden')) {
                userDropdown.classList.add('hidden');
            }
        });
    }
    
    // Dark/Light mode toggle
    const themeToggle = document.querySelector('#theme-toggle');
    
    if (themeToggle) {
        // Check user's preferred color scheme or saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Apply initial theme
        if (savedTheme === 'light' || (!savedTheme && !prefersDarkMode)) {
            document.documentElement.classList.remove('dark');
            themeToggle.querySelector('i').className = 'fa-solid fa-moon';
        } else {
            document.documentElement.classList.add('dark');
            themeToggle.querySelector('i').className = 'fa-solid fa-sun';
        }
        
        // Toggle theme on click
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            themeToggle.querySelector('i').className = isDark 
                ? 'fa-solid fa-sun' 
                : 'fa-solid fa-moon';
        });
    }
    
    // Floating elements animation (optional enhancement)
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        // Add random delay to create more natural movement
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
    });
    
    // Initialize charts if they exist on the page
    initializeCharts();
    
    // Handle form submissions with AJAX
    setupFormHandlers();
    
    // Initialize TimeBank if on that page
    const timeBankContainer = document.querySelector('.timebank-container');
    if (timeBankContainer) {
        initializeTimeBank();
    }
    
    // Initialize tooltips
    initializeTooltips();
});

/**
 * Initialize any charts on the page
 */
function initializeCharts() {
    // Sample chart initialization for dashboard
    const habitChartEl = document.getElementById('habit-completion-chart');
    
    if (habitChartEl) {
        const ctx = habitChartEl.getContext('2d');
        
        // Chart.js configuration with futuristic styling
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Habit Completion',
                    data: [5, 8, 6, 9, 12, 8, 10],
                    borderColor: 'rgba(0, 112, 243, 1)',
                    backgroundColor: 'rgba(0, 112, 243, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 10,
                        bodyFont: {
                            family: "'Outfit', sans-serif"
                        },
                        titleFont: {
                            family: "'Space Mono', monospace",
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            precision: 0
                        }
                    }
                }
            }
        });
    }
    
    // Mood tracking chart
    const moodChartEl = document.getElementById('mood-chart');
    
    if (moodChartEl) {
        const ctx = moodChartEl.getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Happy', 'Calm', 'Focused', 'Energetic', 'Motivated', 'Anxious'],
                datasets: [{
                    label: 'This Week',
                    data: [85, 70, 60, 75, 80, 30],
                    borderColor: 'rgba(0, 196, 255, 1)',
                    backgroundColor: 'rgba(0, 196, 255, 0.1)',
                    borderWidth: 2
                }, {
                    label: 'Last Week',
                    data: [65, 60, 50, 60, 70, 50],
                    borderColor: 'rgba(121, 40, 202, 1)',
                    backgroundColor: 'rgba(121, 40, 202, 0.1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
}

/**
 * Initialize tooltips
 */
function initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip opacity-0 transition-opacity duration-300';
        tooltip.textContent = trigger.getAttribute('data-tooltip');
        
        // Add to DOM
        trigger.style.position = 'relative';
        trigger.appendChild(tooltip);
        
        // Position the tooltip
        tooltip.style.bottom = 'calc(100% + 10px)';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        
        // Show/hide on hover
        trigger.addEventListener('mouseenter', () => {
            tooltip.classList.replace('opacity-0', 'opacity-100');
        });
        
        trigger.addEventListener('mouseleave', () => {
            tooltip.classList.replace('opacity-100', 'opacity-0');
        });
    });
}

/**
 * Helper function to format date
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Helper for API requests with authentication
 */
async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error('No auth token found');
        // Redirect to login if token doesn't exist
        window.location.href = '/login';
        return null;
    }
    
    // Add Authorization header with Bearer token
    const headers = {
        ...options.headers || {},
        'Authorization': `Bearer ${token}`
    };
    
    try {
        const response = await fetch(url, {
            ...options,
            headers
        });
        
        // If unauthorized, redirect to login
        if (response.status === 401) {
            console.error('Unauthorized request - clearing token');
            localStorage.removeItem('token');
            window.location.href = '/login';
            return null;
        }
        
        return response;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

function initializeTimeBank() {
    // Get TimeBank data via API
    authenticatedFetch('/api/timebank')
        .then(response => {
            if (response && response.ok) return response.json();
            throw new Error('Failed to fetch TimeBank data');
        })
        .then(data => {
            if (!data || !data.success) throw new Error(data?.message || 'Invalid response');
            
            // Update TimeBank UI with data
            const timebankData = data.data;
            
            // Update balance
            const balanceEl = document.querySelector('.balance-value');
            if (balanceEl) {
                balanceEl.textContent = `${Math.round(timebankData.coins_earned)} HVC`;
            }
            
            // Update progress
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                // Set progress percentage (assuming 500 minutes is the goal)
                const maxMinutes = 500;
                const percent = Math.min(100, (timebankData.time_saved / maxMinutes) * 100);
                progressBar.style.setProperty('--percent', percent);
                
                // Update time saved display
                const timeEl = document.querySelector('.time-saved');
                if (timeEl) {
                    timeEl.textContent = `${timebankData.time_saved} minutes saved`;
                }
                
                // Animate progress
                animateProgressBar(progressBar, 0, percent, 1500);
            }
            
            // Update conversion rates
            const ratesEl = document.querySelector('.rates-list');
            if (ratesEl && timebankData.conversion_rates) {
                // Clear existing rates
                ratesEl.innerHTML = '';
                
                // Add each rate
                Object.entries(timebankData.conversion_rates).forEach(([key, value]) => {
                    const rateItem = document.createElement('div');
                    rateItem.className = 'rate-item';
                    rateItem.innerHTML = `
                        <div class="rate-label">${key.replace('_', ' ')}</div>
                        <div class="rate-value">${value} HVC</div>
                    `;
                    ratesEl.appendChild(rateItem);
                });
            }
            
            // Re-initialize any tooltips
            initializeTooltips();
        })
        .catch(error => {
            console.error('TimeBank initialization failed:', error);
            // Show error in the UI
            const container = document.querySelector('.timebank-container');
            if (container) {
                const errorEl = document.createElement('div');
                errorEl.className = 'error-message';
                errorEl.textContent = 'Failed to load TimeBank data. Please try again.';
                container.prepend(errorEl);
            }
        });

    // Load available rewards
    loadAvailableRewards();
    
    // Load transaction history
    loadTransactionHistory();
}

/**
 * Load available rewards from the API
 */
function loadAvailableRewards() {
    const rewardsContainer = document.querySelector('.rewards-container');
    if (!rewardsContainer) return;
    
    authenticatedFetch('/api/timebank/rewards')
        .then(response => {
            if (response && response.ok) return response.json();
            throw new Error('Failed to fetch rewards');
        })
        .then(data => {
            if (!data || !data.success) throw new Error(data?.message || 'Invalid response');
            
            const rewards = data.data.rewards;
            const currentCoins = data.data.current_coins;
            
            // Update DOM with rewards
            rewardsContainer.innerHTML = '';
            
            rewards.forEach(reward => {
                const canAfford = currentCoins >= reward.cost;
                
                const rewardItem = document.createElement('div');
                rewardItem.className = `reward-item ${canAfford ? 'bg-white/5' : 'opacity-60 bg-white/5'} rounded-lg p-4 border ${canAfford ? 'border-violet-500/20' : 'border-gray-500/20'} transition-all hover:translate-y-[-2px] hover:shadow-glow-sm`;
                rewardItem.innerHTML = `
                    <div class="reward-icon mb-2">${getRewardIcon(reward.name)}</div>
                    <h3 class="font-medium mb-1">${reward.name}</h3>
                    <p class="text-sm text-gray-400 mb-2">${reward.description}</p>
                    <div class="flex justify-between items-center">
                        <div class="reward-cost text-indigo-300 font-mono">${reward.cost} HVC</div>
                        <button class="redeem-btn px-3 py-1 ${canAfford ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-600'} rounded-md text-sm transition-colors" 
                                data-reward-id="${reward.id}"
                                ${canAfford ? '' : 'disabled'}>
                            ${canAfford ? 'Redeem' : 'Insufficient Coins'}
                        </button>
                    </div>
                `;
                
                rewardsContainer.appendChild(rewardItem);
            });
            
            // Add event listeners to redeem buttons
            setupRedeemButtons();
            
            // Update balance display if needed
            const balanceEl = document.querySelector('.balance-value');
            if (balanceEl) {
                balanceEl.textContent = `${Math.round(currentCoins)} HVC`;
            }
        })
        .catch(error => {
            console.error('Failed to load rewards:', error);
            // Display error in rewards container
            if (rewardsContainer) {
                rewardsContainer.innerHTML = `
                    <div class="error-message p-4 text-center">
                        <p class="text-red-400">Failed to load rewards. Please try again.</p>
                        <button class="retry-btn mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm">
                            Retry
                        </button>
                    </div>
                `;
                
                const retryBtn = rewardsContainer.querySelector('.retry-btn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', loadAvailableRewards);
                }
            }
        });
}

/**
 * Set up event listeners for reward redemption buttons
 */
function setupRedeemButtons() {
    const redeemButtons = document.querySelectorAll('.redeem-btn:not([disabled])');
    
    redeemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rewardId = parseInt(this.getAttribute('data-reward-id'), 10);
            const rewardItem = this.closest('.reward-item');
            const rewardName = rewardItem.querySelector('h3').textContent;
            const rewardCost = rewardItem.querySelector('.reward-cost').textContent.split(' ')[0];
            
            if (confirm(`Are you sure you want to redeem "${rewardName}" for ${rewardCost} HVC?`)) {
                // Show loading state
                const originalText = this.textContent;
                this.disabled = true;
                this.innerHTML = '<div class="loading-spinner mx-auto"></div>';
                
                // Make API call to redeem reward
                authenticatedFetch('/api/timebank/redeem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reward_id: rewardId
                    })
                })
                .then(response => {
                    if (response && response.ok) return response.json();
                    throw new Error('Failed to redeem reward');
                })
                .then(data => {
                    if (!data || !data.success) throw new Error(data?.message || 'Invalid response');
                    
                    // Show success message
                    alert(`Successfully redeemed ${rewardName}!`);
                    
                    // Update balance
                    const balanceEl = document.querySelector('.balance-value');
                    if (balanceEl) {
                        balanceEl.textContent = `${Math.round(data.data.remaining_coins)} HVC`;
                    }
                    
                    // Add a new transaction to the list
                    addTransactionRecord(rewardName, rewardCost, 'spent');
                    
                    // Refresh rewards to update which ones user can now afford
                    setTimeout(loadAvailableRewards, 1000);
                })
                .catch(error => {
                    console.error('Redemption failed:', error);
                    alert('Failed to redeem reward: ' + (error.message || 'Please try again.'));
                })
                .finally(() => {
                    // Reset button
                    this.disabled = false;
                    this.innerHTML = originalText;
                });
            }
        });
    });
}

/**
 * Add a transaction record to the transaction list
 */
function addTransactionRecord(rewardName, cost, type = 'spent') {
    const transactionList = document.querySelector('.transaction-list');
    if (!transactionList) return;
    
    const newTransaction = document.createElement('div');
    newTransaction.className = `transaction-item ${type} bg-white/5 rounded-lg p-3 flex items-center border border-${type === 'earned' ? 'emerald' : 'red'}-500/20 transition-transform duration-300`;
    
    const icon = type === 'earned' ? '⏱️' : '🎁';
    const iconBg = type === 'earned' ? 'emerald' : 'red';
    const amountColor = type === 'earned' ? 'emerald' : 'red';
    const amountPrefix = type === 'earned' ? '+' : '-';
    
    newTransaction.innerHTML = `
        <div class="transaction-icon bg-${iconBg}-900/30 p-2 rounded-full mr-3">${icon}</div>
        <div class="transaction-details flex-1">
            <div class="transaction-title font-medium">${rewardName} ${type === 'spent' ? 'Redeemed' : ''}</div>
            <div class="transaction-time text-xs text-gray-400">Just now</div>
        </div>
        <div class="transaction-amount text-${amountColor}-400">${amountPrefix}${cost} HVC</div>
    `;
    
    // Add with animation
    newTransaction.style.opacity = '0';
    newTransaction.style.transform = 'translateX(-20px)';
    transactionList.prepend(newTransaction);
    
    setTimeout(() => {
        newTransaction.style.transition = 'all 0.5s ease';
        newTransaction.style.opacity = '1';
        newTransaction.style.transform = 'translateX(0)';
    }, 10);
}

/**
 * Get appropriate emoji icon for a reward
 */
function getRewardIcon(rewardName) {
    const nameToIcon = {
        'Coffee Break': '☕',
        'Extended Lunch': '🍽️',
        'Work From Home Day': '🏠',
        'Movie Ticket': '🎬',
        'Book Voucher': '📚',
        'Gaming Break': '🎮',
        'Food Treat': '🍕'
    };
    
    return nameToIcon[rewardName] || '🎁';
}

function animateProgressBar(element, start, end, duration) {
    const startTime = performance.now();
    
    function animate(time) {
        const timeElapsed = time - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const currentValue = start + progress * (end - start);
        
        element.style.setProperty('--percent', currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * Load transaction history from the API
 */
function loadTransactionHistory() {
    const transactionList = document.querySelector('.transaction-list');
    if (!transactionList) return;
    
    // Show loading indicator
    transactionList.innerHTML = `
        <div class="loading-indicator text-center py-6">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <p class="mt-2 text-indigo-300">Loading transactions...</p>
        </div>
    `;
    
    authenticatedFetch('/api/timebank/transactions')
        .then(response => {
            if (response && response.ok) return response.json();
            throw new Error('Failed to fetch transactions');
        })
        .then(data => {
            if (!data || !data.success) throw new Error(data?.message || 'Invalid response');
            
            const transactions = data.data;
            
            // Clear loading indicator
            transactionList.innerHTML = '';
            
            if (transactions.length === 0) {
                transactionList.innerHTML = `
                    <div class="text-center py-6 text-gray-400">
                        <p>No transactions yet</p>
                    </div>
                `;
                return;
            }
            
            // Add each transaction to the list
            transactions.forEach(transaction => {
                const isEarned = transaction.type === 'earned';
                const icon = transaction.icon || (isEarned ? '⏱️' : '🎁');
                const iconBg = isEarned ? 'emerald' : 'red';
                const amountColor = isEarned ? 'emerald' : 'red';
                const amountPrefix = isEarned ? '+' : '-';
                
                const transactionItem = document.createElement('div');
                transactionItem.className = `transaction-item ${transaction.type} bg-white/5 rounded-lg p-3 flex items-center border border-${isEarned ? 'emerald' : 'red'}-500/20 transition-transform duration-300`;
                
                transactionItem.innerHTML = `
                    <div class="transaction-icon bg-${iconBg}-900/30 p-2 rounded-full mr-3">${icon}</div>
                    <div class="transaction-details flex-1">
                        <div class="transaction-title font-medium">${transaction.title}</div>
                        <div class="transaction-time text-xs text-gray-400">${transaction.formatted_date}</div>
                    </div>
                    <div class="transaction-amount text-${amountColor}-400">${amountPrefix}${Math.round(transaction.amount)} HVC</div>
                `;
                
                transactionList.appendChild(transactionItem);
                
                // Add hover effects
                transactionItem.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                });
                
                transactionItem.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        })
        .catch(error => {
            console.error('Failed to load transactions:', error);
            // Display error in transaction list
            transactionList.innerHTML = `
                <div class="error-message p-4 text-center">
                    <p class="text-red-400">Failed to load transactions. Please try again.</p>
                    <button class="retry-btn mt-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm">
                        Retry
                    </button>
                </div>
            `;
            
            const retryBtn = transactionList.querySelector('.retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', loadTransactionHistory);
            }
        });
} 