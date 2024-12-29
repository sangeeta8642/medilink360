import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import React from 'react'

const Signup = () => {

    const sample = async (params) => {

    }

    return (
        <Form>
            <FormField
                control={sample}
                name="..."
                render={() => (
                    <FormItem>
                        <FormLabel />
                        <FormControl>
                            { /* Your form field */}
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>


    )
}

export default Signup