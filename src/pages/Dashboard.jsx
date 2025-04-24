import { useState } from 'react';
import { useGetDashboardDataQuery } from '@/store/services/checksApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, RadialBarChart, 
  RadialBar, AreaChart, Area, ComposedChart, Treemap, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, Brush
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format, parseISO } from 'date-fns';

const COLORS = ['#0ea5e9', '#6366f1', '#f43f5e', '#f97316', '#10b981', '#8b5cf6'];

const StatCard = ({ title, value, description, loading }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">
          {loading ? <Skeleton className="h-8 w-20" /> : value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const CustomBarShape = (props) => {
  const { x, y, width, height, fill } = props;
  const radius = 8;
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={radius}
        ry={radius}
      />
      <rect
        x={x}
        y={y + height - radius}
        width={width}
        height={radius}
        fill={fill}
        opacity={0.5}
      />
    </g>
  );
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const { data, isLoading } = useGetDashboardDataQuery();
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!data) return [];
    
    switch (timeRange) {
      case 'daily':
        return data.dailyData.slice(-7);
      case 'weekly':
        return data.dailyData.slice(-14);
      case 'monthly':
        return data.dailyData;
      default:
        return data.dailyData.slice(-14);
    }
  };
  
  // Format date for x-axis
  const formatXAxis = (dateStr) => {
    return format(parseISO(dateStr), 'MMM dd');
  };
  
  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Requires Attention':
        return 'destructive';
      default:
        return 'outline';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of all facility checks and maintenance tasks</p>
        </div>
      </div>
      
      <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Checks" 
          value={data?.summary.total || 0} 
          description="All-time total checks" 
          loading={isLoading}
        />
        <StatCard 
          title="Completed" 
          value={data?.summary.completed || 0} 
          description="Successfully completed checks" 
          loading={isLoading}
        />
        <StatCard 
          title="Pending" 
          value={data?.summary.pending || 0} 
          description="Currently pending checks" 
          loading={isLoading}
        />
        <StatCard 
          title="Requires Attention" 
          value={data?.summary.attention || 0} 
          description="Checks that need attention" 
          loading={isLoading}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-1">
        {/* Animated Area Chart with Gradient */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Daily Check Activity</CardTitle>
            <CardDescription>Trend of completed and pending checks</CardDescription>
            <Tabs defaultValue="weekly" className="w-full" onValueChange={setTimeRange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getFilteredData()}>
                  <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
</linearGradient>

<linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
</linearGradient>

                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatXAxis} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} checks`, '']}
                    labelFormatter={(label) => format(parseISO(label), 'MMMM dd, yyyy')}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="completedChecks" 
                    stroke="#0ea5e9" 
                    fillOpacity={1} 
                    fill="url(#colorCompleted)" 
                    animationDuration={2000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pendingChecks" 
                    stroke="#f97316" 
                    fillOpacity={1} 
                    fill="url(#colorPending)" 
                    animationDuration={2000}
                  />
                  <Brush 
                    dataKey="date" 
                    height={20} 
                    stroke="#8884d8" 
                    tickFormatter={formatXAxis}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        {/* Custom Shape Bar Chart */}
        {/* <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Checks by Category</CardTitle>
            <CardDescription>Distribution of checks across categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.categoryData || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="completed" 
                    name="Completed" 
                    shape={<CustomBarShape />}
                    fill="#0ea5e9" 
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="pending" 
                    name="Pending" 
                    shape={<CustomBarShape />}
                    fill="#f97316" 
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="attention" 
                    name="Attention" 
                    shape={<CustomBarShape />}
                    fill="#f43f5e" 
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card> */}
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {/* Recent Checks List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Checks</CardTitle>
            <CardDescription>Latest facility check activities</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {data?.recentChecks.slice(0, 5).map((check) => (
                  <div 
                    key={check.id} 
                    className="flex items-center justify-between border-b border-border pb-2"
                  >
                    <div>
                      <p className="font-medium">{check.category} Check</p>
                      <p className="text-sm text-muted-foreground">
                        By {check.performedBy} on {format(new Date(check.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(check.status)}>{check.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Radial Bar Chart (Gauge-style) */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Check status overview</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  innerRadius="20%" 
                  outerRadius="80%" 
                  data={[
                    { name: 'Completed', value: data?.summary.completed || 0, fill: COLORS[0] },
                    { name: 'Pending', value: data?.summary.pending || 0, fill: COLORS[2] },
                    { name: 'Attention', value: data?.summary.attention || 0, fill: COLORS[3] },
                  ]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar 
                    minAngle={15} 
                    label={{ position: 'insideStart', fill: '#fff' }} 
                    background 
                    clockWise 
                    dataKey="value" 
                  />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                  <Tooltip formatter={(value) => [`${value} checks`, '']} />
                </RadialBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Treemap for Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Volume</CardTitle>
            <CardDescription>Relative size of checks by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={data?.categoryData.map(item => ({
                    name: item.category,
                    size: item.completed + item.pending + item.attention,
                    completed: item.completed,
                    pending: item.pending,
                    attention: item.attention
                  }))}
                  dataKey="size"
                  aspectRatio={4/3}
                  stroke="#fff"
                  fill="#8884d8"
                >
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${props.payload.name}: ${value} checks`,
                      `Completed: ${props.payload.completed}`,
                      `Pending: ${props.payload.pending}`,
                      `Attention: ${props.payload.attention}`
                    ]}
                  />
                </Treemap>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Polar Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Comparison across categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={data?.categoryData || []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 10']} />
                  <Radar 
                    name="Completed" 
                    dataKey="completed" 
                    stroke="#0ea5e9" 
                    fill="#0ea5e9" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Pending" 
                    dataKey="pending" 
                    stroke="#f97316" 
                    fill="#f97316" 
                    fillOpacity={0.6} 
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;