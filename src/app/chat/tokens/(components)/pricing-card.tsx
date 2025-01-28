import { PayPalButtons } from '@paypal/react-paypal-js';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';

import { Separator } from '@/components/ui/separator';
import { api } from '../../../../../convex/_generated/api';

type PricingCardProps = {
  name: string;
  tokens: string;
  desc: string;
  value: number;
  price: number;
  userTokens?: number;
};

const PricingCard = ({
  name,
  tokens,
  desc,
  value,
  price,
  userTokens,
}: PricingCardProps) => {
  const updateTokens = useMutation(api.users.updateUsersTokens);

  return (
    <li className='flex flex-col border border-border rounded-lg bg-muted/25'>
      <div className='p-4 space-y-2'>
        <h1 className='text-2xl font-medium'>{name}</h1>
        <h2 className='flex items-center text-lg'>
          <Sparkles
            className='size-4 mr-1.5'
            fill='white'
          />
          {tokens} tokens
        </h2>
        <p className='text-sm text-muted-foreground min-h-16'>{desc}</p>
      </div>
      <Separator />
      <div className='p-4 flex items-center justify-center'>
        <div className='relative leading-none pl-5'>
          <span className='absolute left-1 top-0.5 text-base'>$</span>
          <span className='text-4xl'>{price}</span>
        </div>
      </div>
      <Separator />
      <div className='p-4'>
        <div className='h-[32px] rounded-lg overflow-hidden border border-border'>
          <PayPalButtons
            style={{
              layout: 'horizontal',
              label: 'paypal',
              color: 'white',
              shape: 'rect',
              tagline: false,
              height: 32,
            }}
            createOrder={(_, actions) => {
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  { amount: { currency_code: 'USD', value: String(price) } },
                ],
              });
            }}
            onApprove={async (_, actions) => {
              try {
                await actions.order?.capture();
                const totalTokens = Number(userTokens) + value;
                console.log(totalTokens);

                await updateTokens({ tokens: totalTokens });
                toast.success(`${tokens} have been added`);
              } catch {
                toast.error('Failed to process payment. Please try again');
              }
            }}
            onCancel={() => {
              toast.error('Purchase was cancelled');
            }}
            onError={() => {
              toast.error('Failed to process payment. Please try again');
            }}
          />
        </div>
      </div>
    </li>
  );
};

export default PricingCard;
