import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create, deleteMethod, edit, index, show } from '@/routes/products';
import { Product, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BadgeCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: index().url,
    },
];

interface ProductsIndexPageProps {
    flash?: {
        message?: string;
    };
    products?: Product[];
}

function ProductsTable({ products }: { products: Product[] | undefined }) {
    return (
        <div>
            <Table>
                <TableCaption>Product List</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">
                                    {product.id}
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    {product.description
                                        ? product.description.substring(0, 20)
                                        : '-'}

                                    {product.description &&
                                    product.description.length > 20
                                        ? '...'
                                        : ''}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Link
                                        href={show(product.id).url}
                                        className="mr-2 underline"
                                    >
                                        <Button
                                            variant={'outline'}
                                            size={'sm'}
                                            className="cursor-pointer"
                                        >
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={edit(product.id).url}
                                        className="mr-2 underline"
                                    >
                                        <Button
                                            variant={'secondary'}
                                            size={'sm'}
                                            className="cursor-pointer"
                                        >
                                            Edit
                                        </Button>
                                    </Link>

                                    <Link
                                        href={deleteMethod(product.id).url}
                                        className="text-red-400 underline"
                                        method="delete"
                                    >
                                        <Button
                                            variant={'destructive'}
                                            size={'sm'}
                                            className="cursor-pointer"
                                        >
                                            Delete
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No products found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default function Products() {
    const { flash, products } = usePage().props as ProductsIndexPageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            {flash?.message && (
                <div className="mx-3">
                    <Alert
                        className="border-0 bg-green-200 text-black"
                        variant="destructive"
                    >
                        <BadgeCheck />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription className="!text-black">
                            <p>{flash?.message}</p>
                        </AlertDescription>
                    </Alert>
                </div>
            )}
            <div className="flex flex-row overflow-x-auto rounded-xl p-2">
                <div className="grid auto-rows-min">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-3 dark:border-sidebar-border">
                        <Link href={create()} className="">
                            <Button>
                                <span className="text-lg font-medium">
                                    Add Product
                                </span>
                            </Button>
                        </Link>

                        <br />
                    </div>

                    <ProductsTable products={products} />
                </div>
            </div>
        </AppLayout>
    );
}
