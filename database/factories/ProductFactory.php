<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 1, 10),
            'picture' => Arr::random([
                'https://avatars.githubusercontent.com/u/97165289',
                'https://avatars.githubusercontent.com/u/6154722',
                'https://avatars.githubusercontent.com/u/69631',
                'https://avatars.githubusercontent.com/u/1459110',
                'https://avatars.githubusercontent.com/u/698437',
                'https://avatars.githubusercontent.com/u/139426',
                'https://avatars.githubusercontent.com/u/13142323',
                'https://avatars.githubusercontent.com/u/9952053',
                'https://avatars.githubusercontent.com/u/1500684',
                'https://avatars.githubusercontent.com/u/75488',
                'https://avatars.githubusercontent.com/u/12345678',
                'https://avatars.githubusercontent.com/u/11618545',
                'https://avatars.githubusercontent.com/u/6471485',
                'https://avatars.githubusercontent.com/u/684879',
                'https://avatars.githubusercontent.com/u/4604537',

            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
