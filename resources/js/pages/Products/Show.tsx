import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: index().url,
    },
    {
        title: 'Product Details',
        href: '#',
    },
];

interface Product {
    id?: number;
    name?: string;
    price?: number;
    description?: string;
}

interface PageProps {
    product?: Product;
}

export default function Products() {
    const { product } = usePage().props as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex flex-col items-center justify-center gap-2">
                <Table>
                    <TableCaption>Product Details</TableCaption>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                Product ID
                            </TableCell>
                            <TableCell className="font-medium">
                                {product?.id}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Product Name
                            </TableCell>
                            <TableCell className="font-medium">
                                {product?.name}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Product Price
                            </TableCell>
                            <TableCell className="font-medium">
                                {product?.price}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">
                                Product Description
                            </TableCell>
                            <TableCell className="font-medium">
                                {product?.description}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
