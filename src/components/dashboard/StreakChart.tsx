import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Calendar, Flame, Target } from 'lucide-react';

// Generate mock data for the last 30 days
const generateStreakData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Simulate learning activity (0 or 1)
    const hasActivity = Math.random() > 0.2; // 80% chance of activity
    const hours = hasActivity ? Math.floor(Math.random() * 4) + 1 : 0;
    
    data.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      activity: hasActivity ? 1 : 0,
      hours: hours,
      streak: 0 // Will be calculated
    });
  }
  
  // Calculate streak
  let currentStreak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].activity === 1) {
      currentStreak++;
      data[i].streak = currentStreak;
    } else {
      currentStreak = 0;
      data[i].streak = 0;
    }
  }
  
  return data;
};

const streakData = generateStreakData();
const currentStreak = streakData[streakData.length - 1]?.streak || 0;
const maxStreak = Math.max(...streakData.map(d => d.streak));
const totalActiveDays = streakData.filter(d => d.activity === 1).length;

interface StreakChartProps {
  onClose: () => void;
}

export default function StreakChart({ onClose }: StreakChartProps) {
  const [viewType, setViewType] = useState<'calendar' | 'chart'>('calendar');

  const getStreakColor = (activity: number) => {
    if (activity === 0) return 'bg-gray-100';
    return 'bg-green-500';
  };

  const getStreakIntensity = (hours: number) => {
    if (hours === 0) return 'opacity-20';
    if (hours === 1) return 'opacity-40';
    if (hours === 2) return 'opacity-60';
    if (hours === 3) return 'opacity-80';
    return 'opacity-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-600" />
            Learning Streak
          </h2>
          <p className="text-muted-foreground">Track your daily learning consistency</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to Dashboard
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-600" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStreak}</div>
            <p className="text-xs text-muted-foreground">
              {currentStreak > 0 ? 'days in a row' : 'Start today!'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              Best Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maxStreak}</div>
            <p className="text-xs text-muted-foreground">personal record</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              Active Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveDays}</div>
            <p className="text-xs text-muted-foreground">out of 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Consistency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((totalActiveDays / 30) * 100)}%</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Streak Goal */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Target className="w-5 h-5" />
            {currentStreak >= 7 ? 'Goal Achieved!' : 'Weekly Goal'}
          </CardTitle>
          <CardDescription className="text-orange-700">
            {currentStreak >= 7 
              ? `Amazing! You've maintained a ${currentStreak}-day streak. Keep it up!`
              : `Maintain a 7-day streak. You're ${Math.max(0, 7 - currentStreak)} days away!`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (currentStreak / 7) * 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your learning activity over the past 30 days</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewType === 'calendar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('calendar')}
              >
                Calendar View
              </Button>
              <Button
                variant={viewType === 'chart' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('chart')}
              >
                Chart View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === 'calendar' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {streakData.map((day) => (
                  <div
                    key={day.date}
                    className={`
                      w-8 h-8 rounded-sm border-2 border-gray-200 flex items-center justify-center text-xs font-medium
                      ${getStreakColor(day.activity)} ${getStreakIntensity(day.hours)}
                      ${day.activity === 1 ? 'text-white' : 'text-gray-400'}
                      hover:scale-110 transition-transform cursor-pointer
                    `}
                    title={`${day.date}: ${day.hours}h learning`}
                  >
                    {new Date(day.date).getDate()}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-100 rounded-sm border" />
                  <span>No activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-sm" />
                  <span>Learning day</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={streakData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label, payload) => {
                      const data = payload?.[0]?.payload;
                      return data ? `${data.date} (${data.day})` : label;
                    }}
                    formatter={(value, name) => [
                      name === 'streak' ? `${value} days` : `${value}h`,
                      name === 'streak' ? 'Streak' : 'Hours'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="streak" 
                    stroke="#f97316" 
                    fill="#fed7aa" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}