
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Transaction, Budget } from '@/types/finance';
import { CATEGORIES } from '@/data/categories';
import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';

interface InsightsPanelProps {
  transactions: Transaction[];
  budgets: Budget[];
}

const InsightsPanel = ({ transactions, budgets }: InsightsPanelProps) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);
  
  const currentMonthExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amount, 0);
  
  const lastMonthExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(lastMonth))
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseChange = lastMonthExpenses > 0 
    ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 
    : 0;

  // Get top spending category
  const categorySpending: Record<string, number> = {};
  transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .forEach(t => {
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });

  const topCategory = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)[0];

  // Budget insights
  const overBudgetCategories = budgets.filter(b => b.spent > b.amount);
  const nearBudgetCategories = budgets.filter(b => 
    b.spent <= b.amount && (b.spent / b.amount) > 0.8
  );

  const insights = [];

  // Spending trend insight
  if (expenseChange !== 0) {
    insights.push({
      type: expenseChange > 0 ? 'warning' : 'positive',
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      title: `Spending ${expenseChange > 0 ? 'Increased' : 'Decreased'}`,
      description: `Your expenses ${expenseChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(expenseChange).toFixed(1)}% compared to last month`,
    });
  }

  // Top category insight
  if (topCategory) {
    const category = CATEGORIES.find(c => c.id === topCategory[0]);
    insights.push({
      type: 'info',
      icon: Target,
      title: 'Top Spending Category',
      description: `You spent the most on ${category?.name} ($${topCategory[1].toLocaleString()}) this month`,
    });
  }

  // Budget warnings
  if (overBudgetCategories.length > 0) {
    insights.push({
      type: 'warning',
      icon: AlertTriangle,
      title: 'Over Budget Alert',
      description: `You're over budget in ${overBudgetCategories.length} categor${overBudgetCategories.length === 1 ? 'y' : 'ies'}`,
    });
  }

  // Near budget warnings
  if (nearBudgetCategories.length > 0) {
    insights.push({
      type: 'info',
      icon: AlertTriangle,
      title: 'Budget Warning',
      description: `You're close to your budget limit in ${nearBudgetCategories.length} categor${nearBudgetCategories.length === 1 ? 'y' : 'ies'}`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Insights</CardTitle>
        <CardDescription>AI-powered insights about your spending patterns</CardDescription>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Add more transactions to get personalized insights about your spending patterns.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className={`mt-1 ${
                    insight.type === 'warning' ? 'text-orange-600' :
                    insight.type === 'positive' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant={
                        insight.type === 'warning' ? 'destructive' :
                        insight.type === 'positive' ? 'default' : 'secondary'
                      } className="text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
