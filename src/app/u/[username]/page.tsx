"use client"
import NavAno from '@/components/NavAno'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { messageSchema } from '@/schema/messageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
interface FormData {
  content: string;
}
function Page() {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()
  const { username } = useParams()
  const form = useForm<FormData>({
    resolver: zodResolver(messageSchema)
  })
  const { register, handleSubmit, formState: { errors }, reset } = form;
  const sendMessage = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/send-message', {
        username,
        content: data.content
      })
      console.log(response);
      
      if (response.data.success) {
        toast({
          title: "Message Sent",
          description: `Your message to ${username} was sent successfully.`,
          variant: "default",
        });
      }
      if (!response.data.success) {
        toast({
          title: `Not Accepting Message`,
          description: `${username} is currently not accepting messages`,
          variant: "destructive",
        });
      }
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    }
    finally {
      setIsSubmitting(false);
    }
  }
  const suggestion = async () => {
    setIsSuggesting(true)
    try {
      const response = await axios.get('/api/suggest-messages')
      console.log(response);

    } catch (error) {

    }
  }
  return (
    <div>
      <NavAno />
      <div className='text-4xl font-bold flex p-4 mt-2 justify-center align-middle'>
        Give Your Feedback
      </div>
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="p-8 md:pl-28 md:pr-28"
      >
        <div className='p-12 md:pl-28 md:pr-28'>
          <div className='text-xl pb-2'>Send Anonymous message to {username}</div>
          <div className='pb-8'><Textarea placeholder='Write your message here'
            {...register('content')}
          />
            {errors.content && (
              <p className="text-red-500 text-sm mt-2">
                {errors.content.message}
              </p>
            )}
          </div>
          <div className='flex justify-center align-middle'><Button type='submit' disabled={isSubmitting}>{isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please Wait
            </>
          ) : (
            "Send Message"
          )}
          </Button></div>
        </div>
      </form>
      <div className='pl-12 pr-12 md:pl-28 md:pr-28'>
        <Button disabled={isSuggesting} >
          {isSuggesting ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin'>Please Wait</Loader2>
          ) : (
            "Suggest Messages"
          )}
        </Button>
      </div>
    </div>
  )
}

export default Page
