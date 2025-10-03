import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { index, update } from '@/routes/products';
import { Product, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: index().url,
    },
    {
        title: 'Edit Product',
        href: '#',
    },
];

interface EditFormOptions {
    _method: string;
    id: string | number;
    name: string;
    price: number | string;
    description: string;
}

interface PageProps {
    product?: Product;
}

function EditForm() {
    const { product } = usePage().props as PageProps;

    const { data, setData, post, processing, errors } =
        useForm<EditFormOptions>({
            _method: 'PUT',
            id: product?.id?.toString() ?? '0',
            name: product?.name ?? '',
            price: product?.price ?? '',
            description: product?.description ?? '',
        });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('price', e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setData('description', e.target.value);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        post(update(product?.id?.toString() ?? '0').url);
        console.log(data);
    };

    return (
        <form className="space-y-4 p-4" onSubmit={onSubmit}>
            <div className="3">
                <div className="">
                    {Object.keys(errors).length > 0 && (
                        <Alert
                            className="border-0 bg-red-200"
                            variant="destructive"
                        >
                            <CircleAlert></CircleAlert>
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                {Object.values(errors).map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => handleNameChange(e)}
                    placeholder="Enter product name"
                    required
                />
            </div>
            <div>
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    value={data.price}
                    onChange={(e) => handlePriceChange(e)}
                    placeholder="Enter price"
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => handleDescriptionChange(e)}
                    placeholder="Enter description"
                    maxLength={255}
                />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
                Update Product
            </Button>
        </form>
    );
}

export default function Edit() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <EditForm />
                </div>
            </div>
        </AppLayout>
    );
}
