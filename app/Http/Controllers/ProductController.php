<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate(10);

        return inertia('Products/Index', [
            'products' => $products,
        ]);
    }

    public function show($id, Request $request)
    {
        return inertia('Products/Show', [
            'product' => Product::findOrFail($id),
        ]);
    }

    public function create()
    {
        return inertia('Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'picture' => 'required|string|max:2048',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
        ]);

        $product = Product::create([
            'picture' => $path ?? null,
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
        ]);

        if ($request->has('picture')) {
            $product->picture = $request->get('picture');
            $product->save();
        }

        return redirect()->route('products.index')->with('message', 'Product created successfully.');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return inertia('Products/Edit', compact('product'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
        ]);

        $product = Product::findOrFail($id);
        $product->update([
            'name' => $request->get('name'),
            'price' => $request->get('price'),
            'description' => $request->get('description'),
            'picture' => $path ?? $product->picture,
        ]);

        if ($request->has('picture')) {
            $product->picture = $request->get('picture');
            $product->save();
        }

        return redirect()->route('products.index')->with('message', 'Product updated successfully.');
    }

    public function uploadPicture(Request $request)
    {
        $request->validate([
            'picture' => 'required|image|max:20480',
        ]);

        if ($request->hasFile('picture')) {
            $path = $request->file('picture')->store('pictures', 'public');

            return response()->json([
                'url' => asset('storage/'.$path),
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }

    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('products.index')->with('message', 'Product deleted successfully.');
    }
}
