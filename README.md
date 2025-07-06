# Personal Finance Visualizer

A comprehensive web application for tracking and visualizing personal finances with budgeting capabilities.

## 🚀 Features

### ✅ Stage 1: Basic Transaction Tracking
- **Transaction Management**: Add, edit, and delete transactions with amount, date, and description
- **Transaction List View**: Clean, organized display of all transactions
- **Monthly Expenses Chart**: Visual bar chart showing monthly spending patterns
- **Form Validation**: Input validation for accurate data entry

### ✅ Stage 2: Categories
- **Predefined Categories**: Organized transaction categorization system
- **Category Pie Chart**: Visual breakdown of expenses by category
- **Dashboard Summary**: 
  - Total expenses overview
  - Category breakdown cards
  - Most recent transactions display

### ✅ Stage 3: Budgeting (Current)
- **Monthly Budget Setting**: Set spending limits for each category
- **Budget vs Actual Comparison**: Visual charts comparing planned vs actual spending
- **Spending Insights**: Smart analysis of spending patterns and budget adherence

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Frontend**: React 18
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📱 Design Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error States**: Comprehensive error handling and user feedback
- **Modern UI**: Clean, intuitive interface with shadcn/ui components

## 🏗️ Project Structure

```
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   └── (application files)
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── (configuration files)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-finance-visualizer.git
   cd personal-finance-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Dashboard Overview

### Transaction Management
- Quick add transaction form
- Transaction history with search and filter
- Edit/delete functionality with confirmation

### Visual Analytics
- **Monthly Expenses**: Bar chart showing spending trends
- **Category Breakdown**: Pie chart of expense categories
- **Budget Comparison**: Visual comparison of budget vs actual spending

### Budget Insights
- Budget utilization indicators
- Spending alerts and recommendations
- Monthly budget vs actual analysis

## 🎯 Usage

1. **Add Transactions**: Use the quick-add form to log your expenses
2. **Categorize**: Assign transactions to predefined categories
3. **Set Budgets**: Define monthly spending limits for each category
4. **Monitor**: Track your spending against budgets with visual charts
5. **Analyze**: Review spending patterns and insights

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📈 Future Enhancements

- **Stage 4**: Advanced reporting and analytics
- **Stage 5**: Goal setting and financial planning
- **Stage 6**: Multi-user support and data export

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Project Status**: Stage 3 Complete ✅ | Budgeting Features Implemented
