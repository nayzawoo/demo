<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Product;

class ProductApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $products = Product::latest()->paginate(20);

        return response()->json($products);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = session()->get('cart', []);

        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');

        if (isset($cart[$productId])) {
            $cart[$productId] += $quantity;
        } else {
            $cart[$productId] = $quantity;
        }

        session()->put('cart', $cart);

        return response()->json($this->formatCart($cart));
    }

    public function viewCart(Request $request): JsonResponse
    {
        $cart = session()->get('cart', []);

        return response()->json($this->formatCart($cart));
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer',
        ]);

        $cart = session()->get('cart', []);
        $productId = $request->input('product_id');

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);

            return response()->json($this->formatCart($cart));
        }

        return response()->json(['message' => 'Product not found in cart.'], 404);
    }

    private function formatCart(array $cart): array
    {
        $items = [];
        $total = 0;

        foreach ($cart as $productId => $quantity) {
            $product = Product::find($productId);
            if (!$product) {
                continue;
            }
            $price = floatval($product->price ?? 0);
            $subtotal = $price * intval($quantity);
            $items[] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $price,
                'quantity' => intval($quantity),
                'subtotal' => $subtotal,
                'picture' => $product->picture ?? null,
            ];
            $total += $subtotal;
        }

        return [
            'items' => $items,
            'total' => $total,
        ];
    }
}
