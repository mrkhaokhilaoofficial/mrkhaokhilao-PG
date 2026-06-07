import { motion } from 'framer-motion'
import { orderTrackingSteps, recentOrders } from '../../data/orders'
import { fadeUp } from '../../animations/variants'

const OrderTracking = () => {
  const activeOrder = recentOrders[2] // Cooking stage
  const currentStep = 3 // 1-indexed (Cooking)

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl p-5 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-poppins font-bold text-white text-base">Order Tracking</p>
          <p className="text-muted text-xs mt-0.5">Order {activeOrder.id}</p>
        </div>
        <span className="px-3 py-1 bg-orange-secondary/15 border border-orange-secondary/30 rounded-full text-orange-secondary text-xs font-bold">
          🔥 Cooking
        </span>
      </div>

      {/* Steps — Desktop horizontal */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Background track */}
          <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-white/10" />
          {/* Animated progress fill */}
          <motion.div
            className="absolute top-5 left-[10%] h-0.5 bg-gradient-to-r from-orange-primary to-orange-secondary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (orderTrackingSteps.length - 1)) * 80}%` }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />

          <div className="grid grid-cols-6 relative">
            {orderTrackingSteps.map((step, i) => {
              const isCompleted = i < currentStep
              const isCurrent = i === currentStep - 1
              return (
                <div key={step.id} className="flex flex-col items-center text-center">
                  {/* Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.12, type: 'spring', stiffness: 300 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg relative z-10 border-2 transition-all
                      ${isCompleted
                        ? 'bg-orange-primary border-orange-primary shadow-orange-glow'
                        : isCurrent
                          ? 'bg-orange-primary/15 border-orange-primary/60'
                          : 'bg-bg-secondary border-white/10'
                      }`}
                  >
                    {step.icon}
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-primary rounded-full animate-pulse" />
                    )}
                  </motion.div>

                  <p className={`mt-2 text-xs font-semibold leading-tight font-poppins ${isCurrent ? 'text-orange-primary' : isCompleted ? 'text-white' : 'text-muted'}`}>
                    {step.label}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${isCompleted || isCurrent ? 'text-orange-primary/70' : 'text-muted/50'}`}>
                    {step.time}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Steps — Mobile vertical */}
      <div className="sm:hidden space-y-4 relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10" />
        <motion.div
          className="absolute left-4 top-0 w-0.5 bg-orange-primary"
          initial={{ height: '0%' }}
          animate={{ height: `${((currentStep - 1) / (orderTrackingSteps.length - 1)) * 100}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {orderTrackingSteps.map((step, i) => {
          const isCompleted = i < currentStep
          const isCurrent = i === currentStep - 1
          return (
            <div key={step.id} className="flex items-center gap-4 pl-2">
              <div
                className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center text-sm border shrink-0
                  ${isCompleted ? 'bg-orange-primary border-orange-primary' : isCurrent ? 'bg-orange-primary/15 border-orange-primary/50' : 'bg-bg-secondary border-white/10'}`}
              >
                {step.icon}
                {isCurrent && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-primary rounded-full animate-pulse" />}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <p className={`text-xs font-semibold font-poppins ${isCurrent ? 'text-orange-primary' : isCompleted ? 'text-white' : 'text-muted'}`}>
                  {step.label}
                </p>
                <p className="text-muted text-xs">{step.time}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ETA */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-muted text-xs">Estimated Delivery</p>
          <p className="text-white font-bold text-sm mt-0.5">1:20 PM (~30 min)</p>
        </div>
        <button className="px-4 py-2 bg-orange-primary/10 border border-orange-primary/30 text-orange-primary text-xs font-bold rounded-xl hover:bg-orange-primary hover:text-white transition-all">
          Track Live
        </button>
      </div>
    </motion.div>
  )
}

export default OrderTracking
