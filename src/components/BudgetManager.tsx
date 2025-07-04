
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Budget, Transaction } from '@/types/finance';
import { CATEGORIES } from '@/data/categories';
import { Trash2, AlertTriangle } from 'lucide-react';

interface BudgetManagerProps {
  budgets: Budget[];
  transactions: Transaction[];
  onAddBudget: (budget: Omit<Budget, 'spent'>) => void;
  onDeleteBudget: (category: string) => void;
}

const BudgetManager = ({ budgets, transactions, onAddBudget, onDeleteBudget }: BudgetManagerProps) => {
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBudget.category || !newBudget.amount || Number(newBudget.amount) <= 0) {
      return;
    }

    onAddBudget({
      category: newBudget.category,
      amount: Number(newBudget.amount),
    });

    setNewBudget({ category: '', amount: '' });
  };

  const availableCategories = CATEGORIES.filter(
    cat => !budgets.some(budget => budget.category === cat.id)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Set Budget</CardTitle>
          <CardDescription>Create monthly spending limits for different categories</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget-category">Category</Label>
                <Select
                  value={newBudget.category}
                  onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget-amount">Monthly Budget ($)</Label>
                <Input
                  id="budget-amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={!newBudget.category || !newBudget.amount || availableCategories.length === 0}
              className="w-full"
            >
              Add Budget
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Track your spending against your budgets</CardDescription>
        </CardHeader>
        <CardContent>
          {budgets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No budgets set yet. Create your first budget above!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {budgets.map((budget) => {
                const category = CATEGORIES.find(cat => cat.id === budget.category);
                const percentage = (budget.spent / budget.amount) * 100;
                const isOverBudget = budget.spent > budget.amount;
                
                return (
                  <div key={budget.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: category?.color }}
                        >
                          {category?.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{category?.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              ${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
                            </span>
                            {isOverBudget && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Over Budget
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDeleteBudget(budget.category)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress 
                        value={Math.min(percentage, 100)} 
                        className={`h-3 ${isOverBudget ? '[&>div]:bg-red-500' : ''}`}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(1)}% used</span>
                        <span>
                          {isOverBudget 
                            ? `$${(budget.spent - budget.amount).toLocaleString()} over budget`
                            : `$${(budget.amount - budget.spent).toLocaleString()} remaining`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetManager;
