interface PortfolioMilestone {
  percentage: number;
  reached: boolean;
  timestamp?: Date;
}

interface MilestoneState {
  initialValue: number;
  milestones: {
    [key: string]: PortfolioMilestone;
  };
}

const MILESTONE_KEY = 'tradesandbox_milestones';

export const MILESTONES = [
  { value: 10, label: '+10%', type: 'success' as const },
  { value: 25, label: '+25%', type: 'success' as const },
  { value: 50, label: '+50%', type: 'success' as const },
  { value: 100, label: '+100%', type: 'success' as const },
  { value: -10, label: '-10%', type: 'warning' as const },
  { value: -20, label: '-20%', type: 'danger' as const },
  { value: -30, label: '-30%', type: 'danger' as const },
];

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return Promise.resolve('denied');
  }
  
  return Notification.requestPermission();
}

export function getMilestoneState(): MilestoneState {
  const stored = localStorage.getItem(MILESTONE_KEY);
  if (stored) {
    const state = JSON.parse(stored);
    return {
      ...state,
      milestones: Object.fromEntries(
        Object.entries(state.milestones).map(([key, milestone]: [string, any]) => [
          key,
          {
            ...milestone,
            timestamp: milestone.timestamp ? new Date(milestone.timestamp) : undefined,
          },
        ])
      ),
    };
  }
  
  // Initialize with current portfolio value
  return {
    initialValue: 10000, // Default starting value
    milestones: MILESTONES.reduce((acc, m) => {
      acc[m.value.toString()] = { percentage: m.value, reached: false };
      return acc;
    }, {} as { [key: string]: PortfolioMilestone }),
  };
}

export function setMilestoneState(state: MilestoneState): void {
  localStorage.setItem(MILESTONE_KEY, JSON.stringify(state));
}

export function resetMilestones(initialValue: number): void {
  const state: MilestoneState = {
    initialValue,
    milestones: MILESTONES.reduce((acc, m) => {
      acc[m.value.toString()] = { percentage: m.value, reached: false };
      return acc;
    }, {} as { [key: string]: PortfolioMilestone }),
  };
  setMilestoneState(state);
}

export function checkMilestones(
  currentValue: number,
  onMilestoneReached: (milestone: number, label: string, type: 'success' | 'warning' | 'danger') => void
): void {
  const state = getMilestoneState();
  const percentChange = ((currentValue - state.initialValue) / state.initialValue) * 100;
  
  MILESTONES.forEach((milestone) => {
    const key = milestone.value.toString();
    const milestoneData = state.milestones[key];
    
    if (!milestoneData.reached) {
      // Check if milestone is reached
      if (
        (milestone.value > 0 && percentChange >= milestone.value) ||
        (milestone.value < 0 && percentChange <= milestone.value)
      ) {
        // Mark as reached
        state.milestones[key] = {
          ...milestoneData,
          reached: true,
          timestamp: new Date(),
        };
        
        setMilestoneState(state);
        
        // Trigger notification
        onMilestoneReached(milestone.value, milestone.label, milestone.type);
        
        // Send browser notification
        sendBrowserNotification(milestone.label, currentValue, state.initialValue);
      }
    }
  });
}

function sendBrowserNotification(label: string, currentValue: number, initialValue: number): void {
  if (Notification.permission === 'granted') {
    const isPositive = label.startsWith('+');
    const icon = isPositive ? '📈' : '📉';
    const profit = currentValue - initialValue;
    
    new Notification(`${icon} Portfolio Milestone: ${label}`, {
      body: `Your portfolio is now worth $${currentValue.toFixed(2)} (${isPositive ? '+' : ''}$${profit.toFixed(2)})`,
      icon: '/favicon.ico',
      tag: 'portfolio-milestone',
    });
  }
}

export function initializeMilestones(currentValue: number): void {
  const state = getMilestoneState();
  
  // If initial value is still default, set it to current value
  if (state.initialValue === 10000 && currentValue !== 10000) {
    resetMilestones(currentValue);
  }
}
