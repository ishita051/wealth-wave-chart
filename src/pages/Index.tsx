
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Transaction, Budget } from '@/types/finance';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import Charts from '@/components/Charts';
import BudgetManager from '@/components/BudgetManager';
import InsightsPanel from '@/components/InsightsPanel';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('finance-transactions');
    const savedBudgets = localStorage.getItem('finance-budgets');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('finance-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance-budgets', JSON.stringify(budgets));
  }, [budgets]);

  // Update budget spent amounts based on transactions
  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const updatedBudgets = budgets.map(budget => {
      const spent = transactions
        .filter(t => 
          t.type === 'expense' && 
          t.category === budget.category && 
          t.date.startsWith(currentMonth)
        )
        .reduce((sum, t) => sum + t.amount, 0);
      
      return { ...budget, spent };
    });
    
    setBudgets(updatedBudgets);
  }, [transactions]);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    toast({
      title: "Transaction added",
      description: `${transactionData.type === 'income' ? 'Income' : 'Expense'} of $${transactionData.amount} has been recorded.`,
    });
  };

  const handleEditTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;
    
    const updatedTransaction: Transaction = {
      ...transactionData,
      id: editingTransaction.id,
    };
    
    setTransactions(prev => 
      prev.map(t => t.id === editingTransaction.id ? updatedTransaction : t)
    );
    
    setEditingTransaction(null);
    toast({
      title: "Transaction updated",
      description: "Your transaction has been successfully updated.",
    });
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed from your records.",
      variant: "destructive",
    });
  };

  const handleAddBudget = (budgetData: Omit<Budget, 'spent'>) => {
    const newBudget: Budget = {
      ...budgetData,
      spent: 0,
    };
    
    setBudgets(prev => [...prev, newBudget]);
    toast({
      title: "Budget created",
      description: `Monthly budget of $${budgetData.amount} set for ${budgetData.category}.`,
    });
  };

  const handleDeleteBudget = (category: string) => {
    setBudgets(prev => prev.filter(b => b.category !== category));
    toast({
      title: "Budget deleted",
      description: "The budget has been removed.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Personal Finance Visualizer
          </h1>
          <p className="text-muted-foreground mt-2">
            Take control of your finances with comprehensive tracking and insights
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="charts">Analytics</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard transactions={transactions} budgets={budgets} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <TransactionForm
                onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
                editingTransaction={editingTransaction}
                onCancel={() => setEditingTransaction(null)}
              />
              <div className="lg:col-span-1">
                <TransactionList
                  transactions={transactions}
                  onEdit={setEditingTransaction}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <Charts transactions={transactions} />
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <BudgetManager
              budgets={budgets}
              transactions={transactions}
              onAddBudget={handleAddBudget}
              onDeleteBudget={handleDeleteBudget}
            />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <InsightsPanel transactions={transactions} budgets={budgets} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
