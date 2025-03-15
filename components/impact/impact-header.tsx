import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./impact-variants";

export function ImpactHeader() {
  return (
    <motion.div
      className="mb-8 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-center mb-2">
        <Leaf className="h-8 w-8 text-green-500 mr-2" />
        <h1 className="text-3xl font-bold">Your Environmental Impact</h1>
      </motion.div>
      <motion.p variants={itemVariants} className="text-muted-foreground">
        Track how your sustainable choices are making a difference
      </motion.p>
    </motion.div>
  );
} 
